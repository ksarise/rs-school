import './sources.css';

interface SourceItem {
    id: string;
    name: string;
}
class Sources {
    public draw(data: SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item: SourceItem) => {
            const sourceClone = sourceItemTemp!.content.cloneNode(true) as DocumentFragment;

            sourceClone.querySelector<Element>('.source__item-name')!.textContent = item.name;
            sourceClone.querySelector<Element>('.source__item')!.setAttribute('data-source-id', item.id);

            fragment.appendChild(sourceClone);
        });

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
