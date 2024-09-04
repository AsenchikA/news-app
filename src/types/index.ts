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

export interface IGetSourcesResponse {
  status: 'ok';
  sources: ISource[];
}

export interface IGetErrorResponse {
  status: 'error';
  code: string;
  message: string;
}

export interface IGetArticlesResponse {
  status: 'ok';
  totalResults: number;
  articles: IArticle[];
}
