import BaseComponentGenerator from '../../components/base-component';
import ButtonElement from '../../components/button';

export default class MainPage {
  private main: HTMLElement;

  private aboutBtn: ButtonElement;

  constructor() {
    const mainGen = new BaseComponentGenerator({
      tag: 'div',
      className: 'main',
    });
    this.aboutBtn = new ButtonElement(
      'aboutBtn',
      'About',
      { type: 'button' },
      () => {}
    );
    mainGen.appendElement(this.aboutBtn.getButton());
    this.main = mainGen.getElement() as HTMLElement;
  }

  public getMain(): HTMLElement {
    return this.main;
  }
}
