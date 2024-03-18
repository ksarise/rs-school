import BaseComponentGenerator from '../base-component';

export default class InputField {
  private inputField: HTMLInputElement;

  constructor(className: string, eventCallback: () => void) {
    const inputGen = new BaseComponentGenerator({
      tag: 'input',
      className,
      attributes: { required: '' },
      event: 'input',
      eventCallback,
    });
    this.inputField = inputGen.getElement() as HTMLInputElement;
  }

  public getElement(): HTMLInputElement {
    return this.inputField;
  }
}
