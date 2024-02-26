export interface Source {
  id: string;
  name: string;
}

export interface News {
  urlToImage: string;
  author: string;
  source: Source;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
}