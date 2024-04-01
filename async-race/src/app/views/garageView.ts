import BaseComponentGenerator from '../components/baseComponent';

const carAmount: number = 0;
const pageNum: number = 1;
export default class GarageView {
  private garagePage: HTMLElement;

  constructor() {
    const garage = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['garage', 'page'],
      id: 'garage',
    });
    const garageToolBox = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['garage_toolbox'],
    });
    const garageToolBoxCreate = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['garage_toolbox_create'],
    });
    const garageToolBoxCreateInputName = new BaseComponentGenerator({
      tag: 'input',
      classNames: ['garage_toolbox_create_input_name'],
      attributes: { placeholder: 'Name' },
    });
    const garageToolBoxCreateInputColor = new BaseComponentGenerator({
      tag: 'input',
      classNames: ['garage_toolbox_create_input_color'],
      attributes: { placeholder: 'Color' },
    });
    const garageToolBoxCreateBtn = new BaseComponentGenerator({
      tag: 'button',
      classNames: ['garage_toolbox_create_btn'],
      content: 'CREATE',
    });
    garageToolBoxCreate.appendChildren([
      garageToolBoxCreateInputName,
      garageToolBoxCreateInputColor,
      garageToolBoxCreateBtn,
    ]);
    const garageToolBoxUpdate = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['garage_toolbox_update'],
    });
    const garageToolBoxUpdateInputName = new BaseComponentGenerator({
      tag: 'input',
      classNames: ['garage_toolbox_update_input_name'],
      attributes: { placeholder: 'Name' },
    });
    const garageToolBoxUpdateInputColor = new BaseComponentGenerator({
      tag: 'input',
      classNames: ['garage_toolbox_update_input_color'],
      attributes: { placeholder: 'Color' },
    });
    const garageToolBoxUpdateBtn = new BaseComponentGenerator({
      tag: 'button',
      classNames: ['garage_toolbox_update_btn'],
      content: 'UPDATE',
    });
    garageToolBoxUpdate.appendChildren([
      garageToolBoxUpdateInputName,
      garageToolBoxUpdateInputColor,
      garageToolBoxUpdateBtn,
    ]);
    const garageToolBoxBtns = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['garage_toolbox_btns'],
    });
    const garageToolBoxBtnsRace = new BaseComponentGenerator({
      tag: 'button',
      classNames: ['garage_toolbox_btns_race'],
      content: 'RACE',
    });
    const garageToolBoxBtnsReset = new BaseComponentGenerator({
      tag: 'button',
      classNames: ['garage_toolbox_btns_reset'],
      content: 'RESET',
    });
    const garageToolBoxBtnsGen = new BaseComponentGenerator({
      tag: 'button',
      classNames: ['garage_toolbox_btns_gen'],
      content: 'GENERATE CARS',
    });
    garageToolBoxBtns.appendChildren([
      garageToolBoxBtnsRace,
      garageToolBoxBtnsReset,
      garageToolBoxBtnsGen,
    ]);
    garageToolBox.appendChildren([
      garageToolBoxCreate,
      garageToolBoxUpdate,
      garageToolBoxBtns,
    ]);
    const garageTitle = new BaseComponentGenerator({
      tag: 'h1',
      classNames: ['winners_title'],
      content: 'Garage',
    });
    const garageAmount = new BaseComponentGenerator({
      tag: 'span',
      classNames: ['winners_amount'],
      content: ` ${carAmount}`,
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
    garageTitle.appendElement(garageAmount);
    pageTitle.appendElement(pageNumber);
    garage.appendChildren([garageToolBox, garageTitle, pageTitle]);
    this.garagePage = garage.getElement();
  }

  getGarage() {
    return this.garagePage;
  }
}
