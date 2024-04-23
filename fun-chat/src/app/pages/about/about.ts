import BaseComponentGenerator from '../../components/base-component';
import ButtonElement from '../../components/button';
import './about.css';

const aboutInfo: string =
  'Fun-chat is a delightful, user-friendly chat application designed for spontaneous conversations and light-hearted interactions. With its intuitive interface and array of playful features, Fun-chat fosters a vibrant community where users can connect, share jokes, and engage in lively discussions effortlessly.';
export default class AboutPage {
  private about: HTMLElement;

  private backBtn: ButtonElement;

  constructor() {
    const aboutGen = new BaseComponentGenerator({
      tag: 'div',
      className: 'about',
    });
    const aboutTitleGen = new BaseComponentGenerator({
      tag: 'h2',
      className: 'about__title',
      content: 'Fun-chat',
    });
    const aboutInfoGen = new BaseComponentGenerator({
      tag: 'p',
      className: 'about__info',
      content: aboutInfo,
    });
    const aboutAuthorGen = new BaseComponentGenerator({
      tag: 'a',
      className: 'about__author',
      content: 'Sergey Kravchenko',
      attributes: { href: 'https://github.com/ksarise' },
    });
    this.backBtn = new ButtonElement(
      'backBtn',
      'Back',
      { type: 'button' },
      () => {}
    );
    aboutGen.appendChildren([
      aboutTitleGen,
      aboutInfoGen,
      aboutAuthorGen,
      this.backBtn.getButton(),
    ]);
    this.about = aboutGen.getElement() as HTMLElement;
  }

  public getAbout(): HTMLElement {
    return this.about;
  }
}
