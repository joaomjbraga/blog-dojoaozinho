import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from '@/types/index';
import { getAllPosts } from '@/lib/mdx';

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || null,
        tags: data.tags || [],
        author: data.author || {
          name: "João M J Braga",
          image: "/images/author.jpg", // Certifique-se de adicionar uma imagem padrão
        },
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}