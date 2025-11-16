# 📝 Blog do Joãozin

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Características

- 📝 **Posts em Markdown** - Sistema completo de leitura de arquivos `.md`
- 🔧 **TypeScript** - Tipagem estática para maior segurança
- ⚡ **Next.js ** - App Router com Server Components
- 🎨 **Tailwind CSS** - Estilização moderna e utilitária
- 📱 **Totalmente Responsivo** - Funciona em todos os dispositivos
- 🌐 **Suporte a HTML em Markdown** - Renderiza tabelas, iframes e outros elementos HTML
- 🔍 **SEO Otimizado** - Metadados configuráveis por post
- 📊 **Tabelas Estilizadas** - Suporte nativo para tabelas HTML e Markdown
- 🎬 **Embed de Vídeos** - Suporte para iframes do YouTube e outros

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/joaomjbraga/blog-dojoaozinho.git
cd blog-dojoaozinho
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

4. **Abra no navegador:**

```
http://localhost:3000
```

## 📁 Estrutura do Projeto

```
blog-dojoaozinho/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página inicial
│   │   ├── globals.css         # Estilos globais
│   │   └── blog/
│   │       └── [slug]/
│   │           └── page.tsx    # Página de post individual
│   ├── components/
│   │   ├── BlogCard.tsx        # Card de preview do post
│   │   ├── Header.tsx          # Cabeçalho do site
│   │   └── MarkdownRenderer.tsx # Renderizador de Markdown
│   └── lib/
│       └── posts.ts            # Funções para ler posts
├── posts/                      # Seus posts em Markdown
│   ├── primeiro-post.md
│   ├── segundo-post.md
│   └── ...
├── next.config.ts              # Configuração do Next.js
├── tailwind.config.js          # Configuração do Tailwind
├── tsconfig.json               # Configuração do TypeScript
└── package.json
```

## 📝 Criando um Post

Crie um arquivo `.md` na pasta `posts/` com o seguinte formato:

```markdown
---
title: "Título do Seu Post"
date: "2025-05-20"
excerpt: "Uma breve descrição do post que aparecerá na listagem."
category: "Categoria"
tags: ["tag1", "tag2", "tag3"]
readTime: "5 min"
coverImage: "https://exemplo.com/imagem.jpg"
author:
  name: "Seu Nome"
  image: "https://exemplo.com/avatar.jpg"
  bio: "Uma breve descrição sobre você"
---

# Título Principal

Seu conteúdo aqui em Markdown...

## Subtítulo

Você pode usar:

- Listas
- **Negrito** e _itálico_
- `Código inline`
- Links e imagens
- Tabelas HTML
- Iframes (YouTube, etc)

\`\`\`javascript
// Blocos de código
const exemplo = "Olá Mundo";
\`\`\`
```

### Campos do Frontmatter

| Campo        | Tipo   | Obrigatório | Descrição                                  |
| ------------ | ------ | ----------- | ------------------------------------------ |
| `title`      | string | Sim         | Título do post                             |
| `date`       | string | Sim         | Data no formato ISO (YYYY-MM-DD)           |
| `excerpt`    | string | Sim         | Resumo breve do post                       |
| `category`   | string | Sim         | Categoria do post                          |
| `tags`       | array  | Não         | Lista de tags                              |
| `readTime`   | string | Não         | Tempo estimado de leitura                  |
| `coverImage` | string | Não         | URL da imagem de capa                      |
| `slug`       | string | Não         | Slug customizado (padrão: nome do arquivo) |
| `author`     | object | Não         | Informações do autor                       |

## 🎨 Elementos Suportados no Markdown

### Tabelas HTML

```html
<table>
  <thead>
    <tr>
      <th>Coluna 1</th>
      <th>Coluna 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Dado 1</td>
      <td>Dado 2</td>
    </tr>
  </tbody>
</table>
```

### Embed de Vídeo (YouTube)

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

### Blocos de Código

\`\`\`javascript
const exemplo = "Código com syntax highlighting";
console.log(exemplo);
\`\`\`

### Citações

> Isso é uma citação em bloco

### Listas

- Item 1
- Item 2
  - Subitem

1. Primeiro
2. Segundo
3. Terceiro

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Lint
npm run lint
```

## 📦 Dependências Principais

- **next** - Framework React para produção
- **react** - Biblioteca UI
- **react-markdown** - Renderizador de Markdown
- **gray-matter** - Parser de frontmatter
- **remark-gfm** - Suporte a GitHub Flavored Markdown
- **rehype-raw** - Suporte a HTML em Markdown
- **tailwindcss** - Framework CSS utilitário
- **typescript** - Superset tipado do JavaScript

Edite o arquivo `src/app/globals.css` para customizar as cores das tabelas, links, código, etc.

### Modificar Layout

Os componentes em `src/components/` podem ser editados para alterar a aparência do blog.

### Adicionar Páginas

Crie novas páginas em `src/app/` seguindo a estrutura do App Router do Next.js.

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure e faça deploy

### Netlify

1. Conecte seu repositório
2. Configure o build command: `npm run build`
3. Configure o publish directory: `.next`

### Docker

```bash
# Build da imagem
docker build -t blog-do-joaozin .

# Executar container
docker run -p 3000:3000 blog-do-joaozin
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**João M J Braga**

- GitHub: [@joaomjbraga](https://github.com/joaomjbraga)
- LinkedIn: [João M J Braga](https://linkedin.com/in/joaomjbraga)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
