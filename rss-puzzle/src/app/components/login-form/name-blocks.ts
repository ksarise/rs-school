import BaseComponentGenerator from '../base-component';
import InputField from './input-field';
import LabelElement from './label';

export default class NameBlock {
  private block: HTMLElement;

  private NameLabel: LabelElement;

  private NameInput: InputField;

  constructor(className: string, content: string) {
    const blockGen = new BaseComponentGenerator({
      tag: 'div',
      className,
    });
    this.block = blockGen.getElement();
    this.NameLabel = new LabelElement(`${className.trim()}Label`, content);
    this.NameInput = new InputField(`${className.trim()}Input`);
    blockGen.appendChildren([
      this.NameLabel.getLabel(),
      this.NameInput.getElement(),
    ]);
  }

  public getBlock(): HTMLElement {
    return this.block;
  }
}
