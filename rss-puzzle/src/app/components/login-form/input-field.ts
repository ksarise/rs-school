import BaseComponentGenerator from '../base-component';

export default class InputField {
  private inputField: HTMLInputElement;

  constructor(className: string) {
    const inputGen = new BaseComponentGenerator({
      tag: 'input',
      className,
      attributes: { required: '' },
    });
    this.inputField = inputGen.getElement() as HTMLInputElement;
  }

  public getElement(): HTMLElement {
    return this.inputField;
  }
}
