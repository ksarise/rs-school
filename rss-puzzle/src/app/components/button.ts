import BaseComponentGenerator from './base-component';

export default class ButtonElement {
  private button: HTMLButtonElement;

  constructor(
    className: string,
    content: string,
    attributes: { [key: string]: string },
    eventCallback: (event: Event) => void
  ) {
    const buttonGen = new BaseComponentGenerator({
      tag: 'button',
      className,
      content,
      attributes,
      event: 'click',
      eventCallback,
    });
    this.button = buttonGen.getElement() as HTMLButtonElement;
  }

  public getButton(): HTMLButtonElement {
    return this.button;
  }
}
