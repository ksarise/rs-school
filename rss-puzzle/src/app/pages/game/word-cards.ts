import BaseComponentGenerator from '../../components/base-component';
import shuffle from '../../utils/shuffle';
import dynamicPropSize from './CardSize';
import ClickCard from './WordCardController';

export default class Words {
  private sentence: string;

  private wordContainer: HTMLElement;

  constructor(sentence: string, wordContainer: HTMLElement) {
    this.sentence = sentence;
    this.wordContainer = wordContainer;
  }

  public renderWords(source: HTMLElement, target: HTMLElement): void {
    const words = this.sentence.split(' ');
    shuffle(words).forEach((item) => {
      const word = new BaseComponentGenerator({
        tag: 'div',
        className: `word`,
        content: item,
      }).getElement();
      word.style.width = dynamicPropSize(words, item);
      ClickCard(word, source, target);
      this.wordContainer.appendChild(word);
    });
  }
}
