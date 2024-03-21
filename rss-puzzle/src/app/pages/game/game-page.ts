import BaseComponentGenerator from '../../components/base-component';
import Words from './word-cards';

export default class GamePage {
  private gamePage: HTMLElement;

  constructor() {
    const gamePageGen = new BaseComponentGenerator({
      tag: 'main',
      className: 'game-page',
    });
    const gamePageTitle = new BaseComponentGenerator({
      tag: 'h1',
      className: 'game-title',
      content: 'Main Game Page',
    });
    const playgroundBlock = new BaseComponentGenerator({
      tag: 'div',
      className: 'playground-block',
    });
    const sourceBlock = new BaseComponentGenerator({
      tag: 'div',
      className: 'source-block',
    });
    const wordsGen = new Words(
      'The students agree they have too much homework',
      sourceBlock.getElement()
    );
    wordsGen.renderWords(
      sourceBlock.getElement(),
      playgroundBlock.getElement()
    );
    gamePageGen.appendChildren([gamePageTitle, playgroundBlock, sourceBlock]);
    this.gamePage = gamePageGen.getElement() as HTMLElement;
  }

  public getGamePage(): HTMLElement {
    return this.gamePage;
  }
}
