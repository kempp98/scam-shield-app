export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    coverImage?: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
  }