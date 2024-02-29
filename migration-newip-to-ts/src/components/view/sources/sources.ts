import './sources.css';
import { SourceResponse, Source } from '../../../types/index';

class Sources {
    public draw(data: SourceResponse): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (sourceItemTemp) {
            data.sources.forEach((item: Source) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
                const sourceName: Element | null = sourceClone.querySelector<Element>('.source__item-name');
                const sourceId: Element | null = sourceClone.querySelector<Element>('.source__item');
                if (sourceName) {
                    sourceName.textContent = item.name;
                }
                if (sourceId && item.id) {
                    sourceId.setAttribute('data-source-id', item.id);
                }
                fragment.appendChild(sourceClone);
            });
            const sourceBlock = document.querySelector('.sources');
            if (sourceBlock) {
                sourceBlock.appendChild(fragment);
            }
        }
    }
}

export default Sources;
