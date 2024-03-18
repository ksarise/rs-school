import BaseComponentGenerator from './components/base-component';

export default class PageWrap {
  private wrap: HTMLElement;

  constructor() {
    const wrapGen = new BaseComponentGenerator({
      tag: 'div',
      className: 'page-wrap',
    });
    this.wrap = wrapGen.getElement() as HTMLElement;
  }

  public getWrap(): HTMLElement {
    return this.wrap;
  }

  public cleanWrap(): void {
    this.wrap.innerHTML = '';
  }
}
