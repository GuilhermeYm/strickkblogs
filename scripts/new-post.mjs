#!/usr/bin/env node
// Cria um novo post em src/content/blog/<ano>/<slug>.md.
// Uso:
//   npm run new                    → modo interativo (pergunta título, descrição e tags)
//   npm run new -- ./rascunho.md   → importa um .md/.mdx existente e o move para o blog
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { argv, exit, stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';

const BLOG_DIR = resolve('src/content/blog');

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (date) =>
	`${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')} ${date.getFullYear()}`;

// Slug no padrão das tags/URLs: minúsculas, sem acentos, hífen no lugar de espaços.
const slugify = (text) =>
	text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

// Escapa aspas simples para YAML single-quoted (' vira '').
const yamlQuote = (value) => `'${value.replace(/'/g, "''")}'`;

const parseFrontmatter = (content) => {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return null;
	const fields = new Map();
	for (const line of match[1].split(/\r?\n/)) {
		const field = line.match(/^(\w[\w-]*):\s*(.*)$/);
		if (field) fields.set(field[1], field[2].trim());
	}
	return { raw: match[0], fields };
};

// Garante que o destino não existe e retorna o caminho final.
const destinationFor = (slug, ext, year) => {
	const dir = join(BLOG_DIR, String(year));
	const dest = join(dir, `${slug}${ext}`);
	if (existsSync(dest)) {
		console.error(`Erro: já existe um post em ${dest}`);
		exit(1);
	}
	mkdirSync(dir, { recursive: true });
	return dest;
};

const importPost = (filePath) => {
	const source = resolve(filePath);
	if (!existsSync(source)) {
		console.error(`Erro: arquivo não encontrado: ${filePath}`);
		exit(1);
	}
	const ext = extname(source);
	if (ext !== '.md' && ext !== '.mdx') {
		console.error(`Erro: o arquivo precisa ser .md ou .mdx (recebido: ${ext || 'sem extensão'})`);
		exit(1);
	}

	let content = readFileSync(source, 'utf8');
	const frontmatter = parseFrontmatter(content);
	if (!frontmatter) {
		console.error(
			'Erro: o arquivo não tem frontmatter. Adicione no topo:\n' +
				'---\ntitle: \'Título\'\ndescription: \'Descrição\'\npubDate: \'Sep 09 2026\'\ntags: []\n---',
		);
		exit(1);
	}

	const missing = ['title', 'description'].filter((field) => !frontmatter.fields.get(field));
	if (missing.length > 0) {
		console.error(`Erro: frontmatter incompleto, faltando: ${missing.join(', ')}`);
		exit(1);
	}

	// Completa campos opcionais ausentes.
	let header = frontmatter.raw;
	if (!frontmatter.fields.get('pubDate')) header = header.replace(/---$/, `pubDate: '${formatDate(new Date())}'\n---`);
	if (!frontmatter.fields.get('tags')) header = header.replace(/---$/, 'tags: []\n---');
	content = header + content.slice(frontmatter.raw.length);

	const pubDate = new Date(frontmatter.fields.get('pubDate') ?? Date.now());
	const year = Number.isNaN(pubDate.valueOf()) ? new Date().getFullYear() : pubDate.getFullYear();
	const slug = slugify(basename(source, ext));
	if (!slug) {
		console.error('Erro: não foi possível gerar um slug a partir do nome do arquivo.');
		exit(1);
	}

	const dest = destinationFor(slug, ext, year);
	writeFileSync(dest, content);
	unlinkSync(source);
	console.log(`Post movido para: ${dest}`);
};

const interactivePost = async () => {
	// Iterador de linhas: funciona tanto em TTY quanto com stdin pipeado
	// (rl.question perde linhas quando o input não é um terminal).
	const rl = createInterface({ input: stdin });
	const lines = rl[Symbol.asyncIterator]();
	const ask = async (prompt) => {
		stdout.write(prompt);
		const { value } = await lines.next();
		return (value ?? '').trim();
	};
	try {
		const title = await ask('Título do post: ');
		if (!title) {
			console.error('Erro: o título é obrigatório.');
			exit(1);
		}
		const description = await ask('Descrição curta: ');
		if (!description) {
			console.error('Erro: a descrição é obrigatória.');
			exit(1);
		}
		const tagsInput = await ask('Tags (separadas por vírgula, opcional): ');
		const tags = tagsInput
			? tagsInput.split(',').map((tag) => slugify(tag)).filter(Boolean)
			: [];

		const now = new Date();
		const slug = slugify(title);
		const dest = destinationFor(slug, '.md', now.getFullYear());
		const content = [
			'---',
			`title: ${yamlQuote(title)}`,
			`description: ${yamlQuote(description)}`,
			`pubDate: '${formatDate(now)}'`,
			`tags: [${tags.map((tag) => yamlQuote(tag)).join(', ')}]`,
			'---',
			'',
			'Escreva seu post aqui.',
			'',
		].join('\n');
		writeFileSync(dest, content);
		console.log(`Post criado: ${dest}`);
	} finally {
		rl.close();
	}
};

const fileArg = argv[2];
if (fileArg) {
	importPost(fileArg);
} else {
	await interactivePost();
}
