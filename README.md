# strickkblogs

Blog pessoal do **Guilherme Yoshio Murakawa** sobre tecnologia, IA e projetos pessoais, construído com [Astro](https://astro.build).

## 🌐 Blog online

O blog está publicado e acessível em:

**[https://GuilhermeYm.github.io/strickkblogs](https://GuilhermeYm.github.io/strickkblogs)**

O deploy é feito automaticamente via **GitHub Actions** a cada push na branch `main` (workflow em `.github/workflows/deploy.yml`), hospedado de graça no **GitHub Pages**.

## ✨ Sobre o projeto

- Posts escritos em **Markdown/MDX**, organizados por ano em `src/content/blog/`
- **Content Collections** com validação de frontmatter (`src/content.config.ts`)
- Sistema de **tags** com páginas de filtro (`/tags/` e `/tags/<tag>/`)
- **Modo escuro/claro** com toggle e paleta monocromática (fonte Inter)
- **RSS** e **sitemap** gerados automaticamente
- Blog, arquivos e páginas de tags (`/`, `/blog`, `/arquivos`, `/tags`)

## 🚀 Estrutura do projeto

```text
├── .github/workflows/deploy.yml   # Deploy automático a cada push na main
├── public/                        # Arquivos estáticos (favicon, etc.)
├── src/
│   ├── assets/                    # Imagens e fontes
│   ├── components/                # Componentes reutilizáveis (.astro)
│   ├── content/
│   │   └── blog/                  # Posts organizados por ano (blog/ANO/nome-do-post.md)
│   ├── content.config.ts          # Schema/validação do frontmatter dos posts
│   ├── layouts/                   # Layouts das páginas
│   ├── pages/                     # Cada arquivo aqui vira uma rota do site
│   └── styles/                    # Estilos (tokens CSS light/dark)
├── astro.config.mjs                # Configuração do Astro (site, base, integrações)
└── package.json
```

## 🧞 Comandos (rodar na raiz do projeto)

| Comando           | Ação                                                        |
| :---------------- | :---------------------------------------------------------- |
| `npm install`     | Instala as dependências                                     |
| `npm run dev`     | Roda o servidor local em `localhost:4321`                   |
| `npm run build`   | Gera o site de produção em `./dist/`                        |
| `npm run preview` | Visualiza o build localmente antes de publicar              |
| `npm run new`     | Cria um novo post de forma interativa (ou importa um `.md`) |

## 📜 Licenciamento

Este projeto usa **duas licenças separadas**, dependendo do tipo de material:

- **Código-fonte:** licenciado sob a **MIT License** (ver [`LICENSE`](LICENSE)). Você pode usar, copiar, modificar e distribuir o código livremente, desde que mantenha o aviso de copyright. Copyright © 2026 Guilherme Yoshio Murakawa.
- **Conteúdo autoral (posts, artigos, ensaios, imagens):** todos os direitos reservados (ver [`CONTENT-LICENSE.md`](CONTENT-LICENSE.md)). É proibida a reprodução, redistribuição, adaptação ou uso comercial dos conteúdos de `src/content/` sem autorização prévia do autor. Trechos curtos podem ser citados com atribuição e link para a publicação original.

Em resumo: o **código é aberto**, o **conteúdo é protegido**.

# 👀 Para aprender mais

- [Documentação do Astro](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
