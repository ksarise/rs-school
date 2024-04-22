import BaseComponentGenerator from '../../components/base-component';
import ButtonElement from '../../components/button';

export default class AboutPage {
  private about: HTMLElement;

  private backBtn: ButtonElement;

  constructor() {
    const aboutGen = new BaseComponentGenerator({
      tag: 'div',
      className: 'about',
    });
    this.backBtn = new ButtonElement(
      'backBtn',
      'Back',
      { type: 'button' },
      () => {}
    );
    aboutGen.appendElement(this.backBtn.getButton());
    this.about = aboutGen.getElement() as HTMLElement;
  }

  public getAbout(): HTMLElement {
    return this.about;
  }
}
