import BaseComponentGenerator from './base-component';

export default class ButtonElement {
  private button: HTMLButtonElement;

  constructor(className: string, content: string, eventCallback: () => void) {
    const buttonGen = new BaseComponentGenerator({
      tag: 'button',
      className,
      content,
      attributes: { disabled: 'true' },
      event: 'click',
      eventCallback,
    });
    this.button = buttonGen.getElement() as HTMLButtonElement;
  }

  public getButton(): HTMLButtonElement {
    return this.button;
  }
}