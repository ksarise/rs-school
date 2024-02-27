export interface Source {
  id: string | null;
  name: string;
}

export interface NewsItem {
  urlToImage: string;
  author: string;
  source: Source;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsItem[];
}

export interface SourceResponse {
  status: string;
  totalResults: number;
  sources: Source[];
}