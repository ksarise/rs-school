import AppLoader from './appLoader';
import { Callback } from '../../types/index';

class AppController extends AppLoader {
    getSources(callback: Callback): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback): void {
        if (e.target instanceof HTMLElement && e.currentTarget instanceof HTMLElement) {
            let target: HTMLElement = e.target;
            const newsContainer: HTMLElement = e.currentTarget;
            while (target !== newsContainer && target) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (!sourceId) {
                        throw new Error('Sourceid is null!');
                    }
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
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
                if (target.parentNode && target.parentNode instanceof HTMLElement) {
                    target = target.parentNode;
                }
            }
        }
    }
}

export default AppController;
