import './news.css';
import { NewsResponse, NewsItem } from '../../../types/index';

class News {
    draw(data: NewsResponse): void {
        const articles: NewsItem[] = data.articles;
        console.log(articles);
        const news = articles.length >= 10 ? articles.filter((_item, idx) => idx < 10) : articles;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp!.content.cloneNode(true) as HTMLElement;
            const newsCloneElement: Element | null = newsClone.querySelector('.news__item');
            if (newsCloneElement && idx % 2) {
                newsCloneElement.classList.add('alt');
            }
            const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsMetaPhoto) {
                if (item.urlToImage !== null) {
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage})`;
                } else {
                    newsMetaPhoto.classList.add('place');
                }
            }
            const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            if (newsMetaAuthor) {
                newsMetaAuthor.textContent = item.author || item.source.name;
            }
            const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (newsMetaDate) {
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }
            const newsMetaTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (newsMetaTitle) {
                newsMetaTitle.textContent = item.title;
            }
            const newsMetaSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (newsMetaSource) {
                newsMetaSource.textContent = item.source.name;
            }
            const newsMetaContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (newsMetaContent) {
                newsMetaContent.textContent = item.description;
            }
            const newsReadmore: HTMLElement | null = newsClone.querySelector('.news__read-more');
            if (newsReadmore) {
                newsReadmore.setAttribute('href', item.url);
            }
            fragment.append(newsClone);
        });
        const newsBlock: HTMLElement | null = document.querySelector<HTMLElement>('.news');
        if (newsBlock) {
            newsBlock.innerHTML = '';
            newsBlock.appendChild(fragment);
        }
    }
}

export default News;
