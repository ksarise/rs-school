import BaseComponentGenerator from '../../components/base-component';

export default class InputField {
  private inputField: HTMLInputElement;

  constructor(classNames: string[], type: string, eventCallback: () => void) {
    const inputGen = new BaseComponentGenerator({
      tag: 'input',
      classNames,
      attributes: { required: '', autocomplete: 'on' },
      event: 'input',
      type,
      eventCallback,
    });
    this.inputField = inputGen.getElement() as HTMLInputElement;
  }

  public getElement(): HTMLInputElement {
    return this.inputField;
  }
}
