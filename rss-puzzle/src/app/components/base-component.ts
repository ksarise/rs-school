import { ElementProps } from '../types/types';

export default class BaseComponentGenerator {
  private element: HTMLElement;

  constructor(props: ElementProps) {
    this.element = this.generateElement(props);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public appendElement(element: HTMLElement | BaseComponentGenerator): void {
    if (!this.element) return;
    let child;
    if (element instanceof BaseComponentGenerator) {
      child = element.getElement();
    } else {
      child = element;
    }
    if (child) this.element.append(child);
  }

  private generateElement({
    tag,
    className,
    content,
    attributes,
  }: ElementProps): HTMLElement {
    const element = document.createElement(tag);
    if (className) {
      this.element.classList.add(className);
    }
    if (content) {
      this.element.textContent = content;
    }
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
      });
    }
    return element;
  }
}
