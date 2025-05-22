export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  author?: {
    name: string;
    image?: string;
    bio?: string;
  };
  image?: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}