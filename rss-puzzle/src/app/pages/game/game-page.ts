import BaseComponentGenerator from '../../components/base-component';

export default class GamePage {
  private gamePage: HTMLElement;

  constructor() {
    const gamePageGen = new BaseComponentGenerator({
      tag: 'div',
      className: 'game-page',
    });
    const gamePageTitle = new BaseComponentGenerator({
      tag: 'h1',
      className: 'game-title',
      content: 'Main Game Page',
    });
    gamePageGen.appendElement(gamePageTitle);
    this.gamePage = gamePageGen.getElement() as HTMLElement;
  }

  public getGamePage(): HTMLElement {
    return this.gamePage;
  }
}
