import BaseComponentGenerator from './base-component';
import ButtonElement from './button';

const logoutHandler = () => {
  localStorage.removeItem('ksarisePuzzleSession');
  console.log('no');
};

export default class Header {
  private head: HTMLElement;

  constructor() {
    const headGen = new BaseComponentGenerator({
      tag: 'div',
      className: 'header',
    });
    this.head = headGen.getElement() as HTMLElement;
    const logoutBtn = new ButtonElement(
      'logout-btn',
      'Log Out',
      { type: 'button' },
      () => logoutHandler()
    );
    logoutBtn.getButton().addEventListener('click', logoutHandler);
    this.head.appendChild(logoutBtn.getButton());
  }

  public getHeader(): HTMLElement {
    return this.head;
  }
}
