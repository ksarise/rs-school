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
            const newsClone = newsItemTemp!.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')!.classList.add('alt');

            newsClone.querySelector<HTMLElement>('.news__meta-photo')!.style.backgroundImage = `url(${
                item.urlToImage || '350931d95a9f7ad6376d.png'
            })`;
            newsClone.querySelector<HTMLElement>('.news__meta-author')!.textContent = item.author || item.source.name;
            newsClone.querySelector<HTMLElement>('.news__meta-date')!.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsClone.querySelector<HTMLElement>('.news__description-title')!.textContent = item.title;
            newsClone.querySelector<HTMLElement>('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector<HTMLElement>('.news__description-content')!.textContent = item.description;
            newsClone.querySelector<HTMLElement>('.news__read-more a')!.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector<HTMLElement>('.news')!.innerHTML = '';
        document.querySelector<HTMLElement>('.news')!.appendChild(fragment);
    }
}

export default News;
