import BaseComponentGenerator from '../../components/base-component';
import ButtonElement from '../../components/button';

export default class MainPage {
  private main: HTMLElement;

  private aboutBtn: ButtonElement;

  private logoutBtn: ButtonElement;

  private username: string = '';

  constructor() {
    const mainGen = new BaseComponentGenerator({
      tag: 'div',
      className: 'main',
    });
    const headerGen = new BaseComponentGenerator({
      tag: 'header',
      className: 'header',
    });
    this.getUsername();
    const usernameGen = new BaseComponentGenerator({
      tag: 'h2',
      className: 'username',
      content: `User: ${this.username}`,
    });
    const titleGen = new BaseComponentGenerator({
      tag: 'h1',
      className: 'title',
      content: 'Fun Chat',
    });
    this.aboutBtn = new ButtonElement(
      'aboutBtn',
      'About',
      { type: 'button' },
      () => {}
    );
    this.logoutBtn = new ButtonElement(
      'logoutBtn',
      'Log Out',
      { type: 'button' },
      () => {}
    );
    headerGen.appendChildren([
      usernameGen,
      titleGen,
      this.aboutBtn.getButton(),
      this.logoutBtn.getButton(),
    ]);
    mainGen.appendChildren([headerGen]);

    this.main = mainGen.getElement() as HTMLElement;
  }

  private getUsername() {
    const data = sessionStorage.getItem('ksariseUser');
    if (data) {
      const sessionData = JSON.parse(data);
      this.username = sessionData.name;
    }
  }

  public getMain(): HTMLElement {
    return this.main;
  }
}
