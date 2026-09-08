# Meu Blog (Astro)

Blog criado com [Astro](https://astro.build), pronto para publicar gratuitamente no **GitHub Pages**.

## 🚀 Estrutura do projeto

```text
├── .github/workflows/deploy.yml   # Deploy automático a cada push na main
├── public/                        # Arquivos estáticos (favicon, etc.)
├── src/
│   ├── assets/                    # Imagens e fontes
│   ├── components/                # Componentes reutilizáveis (.astro)
│   ├── content/
│   │   └── blog/                  # Seus posts em Markdown/MDX ficam aqui
│   ├── content.config.ts          # Schema/validação do frontmatter dos posts
│   ├── layouts/                   # Layouts das páginas (estrutura HTML comum)
│   └── pages/                     # Cada arquivo aqui vira uma rota do site
├── astro.config.mjs                # Configuração do Astro (site, base, integrações)
├── package.json
└── tsconfig.json
```

## 🧞 Comandos (rodar na raiz do projeto)

| Comando              | Ação                                             |
| :-------------------- | :----------------------------------------------- |
| `npm install`          | Instala as dependências                          |
| `npm run dev`           | Roda o servidor local em `localhost:4321`        |
| `npm run build`         | Gera o site de produção em `./dist/`             |
| `npm run preview`       | Visualiza o build localmente antes de publicar   |

## 📤 Como publicar no GitHub Pages

1. **Crie um repositório no GitHub** (pode ser público ou privado, desde que sua conta tenha Pages liberado).

2. **Ajuste o `astro.config.mjs`:**
   - Se o repositório se chamar exatamente `seu-usuario.github.io` → use `site: 'https://seu-usuario.github.io'` e **remova** a linha `base`.
   - Se tiver outro nome (ex: `meu-blog`) → mantenha `site` e `base: '/meu-blog'` (ajustando para o nome real).

3. **Suba o código:**
   ```sh
   git init
   git add .
   git commit -m "primeiro commit do blog"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/nome-do-repositorio.git
   git push -u origin main
   ```

4. **Ative o GitHub Pages via Actions:**
   - No repositório, vá em **Settings → Pages**.
   - Em "Build and deployment" → "Source", selecione **GitHub Actions**.

5. **Pronto.** O workflow em `.github/workflows/deploy.yml` já faz o build e publica automaticamente a cada push na branch `main`. Acompanhe o progresso na aba **Actions** do repositório. Depois de alguns minutos, o site estará em `https://seu-usuario.github.io` (ou `/nome-do-repositorio`, conforme o caso).

## ✍️ Como escrever um novo post

Crie um arquivo `.md` ou `.mdx` dentro de `src/content/blog/`, por exemplo `meu-novo-post.md`:

```md
---
title: 'Título do post'
description: 'Uma breve descrição'
pubDate: 2026-09-08
heroImage: '../../assets/alguma-imagem.jpg'
---

Conteúdo do post em Markdown normalmente.
```

Faça commit e push — o deploy acontece sozinho.

## 👀 Para aprender mais

- [Documentação do Astro](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
