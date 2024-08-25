export interface IArticle {
  source: { id: number; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ISource {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
