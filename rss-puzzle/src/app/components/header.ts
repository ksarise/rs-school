/* eslint-disable import/no-cycle */
import BaseComponentGenerator from './base-component';
import ButtonElement from './button';
import logoutHandler from './logoutHandler';

export default class Header {
  private head: HTMLElement;

  constructor() {
    const headGen = new BaseComponentGenerator({
      tag: 'header',
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
