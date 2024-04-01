import BaseComponentGenerator from './baseComponent';

export default class NavElement {
  private navElement: HTMLElement;

  constructor(
    classNames: string[],
    content: string,
    attributes: { [key: string]: string }
  ) {
    this.navElement = document.createElement('li');
    const aGen = new BaseComponentGenerator({
      tag: 'a',
      classNames,
      content,
      attributes,
    });
    this.navElement.appendChild(aGen.getElement());
  }

  public getNavElement(): HTMLElement {
    return this.navElement;
  }
}
