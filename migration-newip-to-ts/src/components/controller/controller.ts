import AppLoader from './appLoader';
import { NewsResponse } from '../../types/index';
import { SourceResponse } from '../../types/index';

class AppController extends AppLoader {
    getSources(callback: (data: SourceResponse) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: NewsResponse) => void): void {
        if (e.target instanceof HTMLElement && e.currentTarget instanceof HTMLElement) {
            let target: HTMLElement = e.target;
            const newsContainer: HTMLElement = e.currentTarget;
            while (target !== newsContainer && target) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (!sourceId) {
                        console.error('sourceid is null!');
                        return;
                    }
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp<NewsResponse>(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                if (target.parentNode) {
                    target = target.parentNode as HTMLElement;
                }
            }
        }
    }
}

export default AppController;
