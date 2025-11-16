import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

// Função auxiliar para encontrar arquivo por slug
function findFileBySlug(slug: string): string | null {
  // Primeiro tenta encontrar por nome de arquivo
  const directPath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  // Se não encontrar, busca em todos os arquivos pelo slug do frontmatter
  const fileNames = fs.readdirSync(postsDirectory);
  const foundFile = fileNames.find(fileName => {
    if (!fileName.endsWith('.md')) return false;

    try {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return data.slug === slug;
    } catch {
      return false;
    }
  });

  return foundFile ? path.join(postsDirectory, foundFile) : null;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || slug,
        title: data.title || 'Sem título',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || data.description || '',
        readTime: data.readTime || '5 min',
        category: data.category || 'Geral',
        content,
      } as Post;
    });

  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = findFileBySlug(slug);

    if (!fullPath) {
      console.error(`Post não encontrado: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || slug,
      title: data.title || 'Sem título',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || data.description || '',
      readTime: data.readTime || '5 min',
      category: data.category || 'Geral',
      content,
    } as Post;
  } catch (error) {
    console.error(`Erro ao ler post ${slug}:`, error);
    return null;
  }
}
