import BaseComponentGenerator from './base-component';

export default class UserContainerElement {
  public userContainer: HTMLElement;

  public userStatus: HTMLElement;

  public userName: HTMLElement;

  public userMessages: HTMLElement;

  constructor() {
    const userContainerGen = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['userContainer'],
    });
    this.userStatus = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['user-status'],
    }).getElement();
    this.userName = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['user-name'],
    }).getElement();
    this.userMessages = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['user-messages'],
    }).getElement();
    userContainerGen.appendChildren([
      this.userStatus,
      this.userName,
      this.userMessages,
    ]);
    this.userContainer = userContainerGen.getElement();
  }

  public getuserContainer(): HTMLElement {
    return this.userContainer;
  }
}
