import './sources.css';
import { SourceResponse, Source } from '../../../types/index';

class Sources {
    public draw(data: SourceResponse): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        data.sources.forEach((item: Source) => {
            const sourceClone = sourceItemTemp!.content.cloneNode(true) as DocumentFragment;
            sourceClone.querySelector<Element>('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector<Element>('.source__item')!.setAttribute('data-source-id', item.id!);
            fragment.appendChild(sourceClone);
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
