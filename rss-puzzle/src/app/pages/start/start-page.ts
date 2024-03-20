/* eslint-disable import/no-cycle */
import BaseComponentGenerator from '../../components/base-component';
import descText from './description';
import getGreeting from './greeting';
import startBtn from './start-btn';

export default class StartPage {
  private start: HTMLElement;

  constructor() {
    const startGen = new BaseComponentGenerator({
      tag: 'main',
      className: 'start-page',
    });
    const startGreeting = new BaseComponentGenerator({
      tag: 'h2',
      className: 'start-greeting',
      content: getGreeting,
    });
    const startWelcome = new BaseComponentGenerator({
      tag: 'p',
      className: 'start-welcome',
      content: 'Welcome to',
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

    startGen.appendChildren([
      startGreeting.getElement(),
      startWelcome.getElement(),
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
