// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
// IMPORTANTE: troque "seu-usuario" e "nome-do-repositorio" abaixo pelos seus dados reais do GitHub.
// - Se o repositório se chamar "seu-usuario.github.io", use site: 'https://seu-usuario.github.io' e REMOVA a linha "base".
// - Se for um repositório com outro nome (ex: "meu-blog"), mantenha as duas linhas como estão.
export default defineConfig({
	site: 'https://GuilhermeYm.github.io',
	base: '/strickkblogs',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: [400, 500, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
	],
});
