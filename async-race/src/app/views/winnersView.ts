import BaseComponentGenerator from '../components/baseComponent';

const winCount: number = 0;
const pageNum: number = 1;
const tableHead: string[] = [
  'Number',
  'Car',
  'Name',
  'Wins',
  'Best time (seconds)',
];
export default class WinnersView {
  private winPage: HTMLElement;

  constructor() {
    const winners = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['winners', 'page', 'hidden'],
      id: 'winners',
    });
    const winnersTitle = new BaseComponentGenerator({
      tag: 'h1',
      classNames: ['winners_title'],
      content: 'Winners',
    });
    const winAmount = new BaseComponentGenerator({
      tag: 'span',
      classNames: ['winners_amount'],
      content: ` ${winCount}`,
    });
    const pageTitle = new BaseComponentGenerator({
      tag: 'p',
      classNames: ['winners_page_title'],
      content: 'Page',
    });
    const pageNumber = new BaseComponentGenerator({
      tag: 'span',
      classNames: ['winners_page_number'],
      content: ` #${pageNum}`,
    });
    const winTable = new BaseComponentGenerator({
      tag: 'table',
      classNames: ['winners_table'],
    });
    const winTableBody = new BaseComponentGenerator({
      tag: 'tbody',
      classNames: ['winners_table_tbody'],
    });
    const winTableTrHead = new BaseComponentGenerator({
      tag: 'tr',
      classNames: ['winners_table_tr', 'winners_table_head'],
    });
    tableHead.forEach((head) => {
      const winTableTh = new BaseComponentGenerator({
        tag: 'th',
        classNames: ['winners_table_th'],
        content: head,
      });
      winTableTrHead.appendElement(winTableTh);
    });
    const pageBtns = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['pageBtns'],
    });
    const prevBtn = new BaseComponentGenerator({
      tag: 'button',
      content: 'PREV',
    });
    const nextBtn = new BaseComponentGenerator({
      tag: 'button',
      content: 'NEXT',
    });
    pageBtns.appendChildren([prevBtn, nextBtn]);
    winTableBody.appendElement(winTableTrHead);
    winTable.appendElement(winTableBody);
    winnersTitle.appendElement(winAmount);
    pageTitle.appendElement(pageNumber);
    winners.appendChildren([winnersTitle, pageTitle, winTable, pageBtns]);
    this.winPage = winners.getElement();
  }

  getwinners() {
    return this.winPage;
  }
}
