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

    drawNews(data: NewsResponse) {
        // const values = data?.articles ? data?.articles : [];
        this.news.draw(data);
    }

    drawSources(data: SourceResponse) {
        // const values = data?.sources ? data?.sources : [];
        this.sources.draw(data);
    }
}

export default AppView;
