import BaseComponentGenerator from '../../components/base-component';

export default class LabelElement {
  private label: HTMLLabelElement;

  constructor(classNames: string[], content: string) {
    const labelGen = new BaseComponentGenerator({
      tag: 'label',
      classNames,
      content,
    });
    this.label = labelGen.getElement() as HTMLLabelElement;
  }

  public getLabel(): HTMLLabelElement {
    return this.label;
  }
}
