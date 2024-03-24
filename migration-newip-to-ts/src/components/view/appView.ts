import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse } from '../../types/index';
import { SourceResponse } from '../../types/index';

export class AppView {
    public news: News;
    public sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse | SourceResponse): void {
        if ('articles' in data) {
            this.news.draw(data as NewsResponse);
        } else if ('sources' in data) {
            this.sources.draw(data as SourceResponse);
        } else {
            throw new Error('Invalid response data');
        }
    }

    drawSources(data: NewsResponse | SourceResponse): void {
        if ('articles' in data) {
            this.news.draw(data as NewsResponse);
        } else if ('sources' in data) {
            this.sources.draw(data as SourceResponse);
        } else {
            throw new Error('Invalid response data');
        }
    }
}

export default AppView;
