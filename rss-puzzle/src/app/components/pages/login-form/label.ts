import BaseComponentGenerator from '../../base-component';

export default class LabelElement {
  private label: HTMLLabelElement;

  constructor(className: string, content: string) {
    const labelGen = new BaseComponentGenerator({
      tag: 'label',
      className,
      content,
    });
    this.label = labelGen.getElement() as HTMLLabelElement;
  }

  public getLabel(): HTMLLabelElement {
    return this.label;
  }
}
