// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
// IMPORTANTE: troque "seu-usuario" e "nome-do-repositorio" abaixo pelos seus dados reais do GitHub.
// - Se o repositório se chamar "seu-usuario.github.io", use site: 'https://seu-usuario.github.io' e REMOVA a linha "base".
// - Se for um repositório com outro nome (ex: "meu-blog"), mantenha as duas linhas como estão.
export default defineConfig({
	site: 'https://seu-usuario.github.io',
	base: '/nome-do-repositorio',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
