export interface Author {
  name: string;
  image?: string;
  bio?: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  author?: Author;
}