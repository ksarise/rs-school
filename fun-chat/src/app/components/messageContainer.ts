import BaseComponentGenerator from './base-component';

export default class MessageContainerElement {
  public messageContainer: HTMLElement;

  public message: HTMLElement;

  public messageHeader: HTMLElement;

  public messageText: HTMLElement;

  public messageStatus: HTMLElement;

  constructor(messageId: string) {
    const messageContainerGen = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['messageContainer'],
      attributes: { 'data-id': messageId },
    });
    const messageGen = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['message'],
      attributes: { 'data-id': messageId },
    });
    this.messageHeader = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['messageHeader'],
      attributes: { 'data-id': messageId },
    }).getElement();
    this.messageText = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['messageText'],
      attributes: { 'data-id': messageId },
    }).getElement();
    this.messageStatus = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['messageStatus'],
      attributes: { 'data-id': messageId },
    }).getElement();
    messageGen.appendChildren([
      this.messageHeader,
      this.messageText,
      this.messageStatus,
    ]);
    this.message = messageGen.getElement();
    messageContainerGen.appendElement(this.message);
    this.messageContainer = messageContainerGen.getElement();
  }

  public getMessageContainer(): HTMLElement {
    return this.messageContainer;
  }
}
