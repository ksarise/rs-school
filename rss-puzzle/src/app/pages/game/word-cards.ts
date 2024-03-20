import BaseComponentGenerator from '../../components/base-component';
import shuffle from '../../utils/shuffle';

function ClickCard(
  element: HTMLElement,
  source: HTMLElement,
  target: HTMLElement
) {
  element.addEventListener('click', () => {
    source.removeChild(element);
    target.appendChild(element);
  });
}
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
      ClickCard(word, source, target);
      this.wordContainer.appendChild(word);
    });
  }
}
