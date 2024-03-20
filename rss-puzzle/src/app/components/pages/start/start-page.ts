import BaseComponentGenerator from '../../base-component';
import ButtonElement from '../../button';
import descText from './description';

export default class StartPage {
  private start: HTMLElement;

  constructor() {
    const startGen = new BaseComponentGenerator({
      tag: 'main',
      className: 'start-page',
    });
    const startTitle = new BaseComponentGenerator({
      tag: 'h1',
      className: 'start-title',
      content: 'RSS - Puzzle',
    });
    const startDesc = new BaseComponentGenerator({
      tag: 'div',
      className: 'start-description',
      content: descText,
    });
    const startBtn = new ButtonElement(
      'start-btn',
      'Start',
      { type: 'button' },
      () => {}
    );
    startGen.appendChildren([
      startTitle.getElement(),
      startDesc.getElement(),
      startBtn.getButton(),
    ]);
    this.start = startGen.getElement() as HTMLElement;
  }

  public getStart(): HTMLElement {
    return this.start;
  }
}
