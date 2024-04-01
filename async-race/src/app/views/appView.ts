import Router from '../router/router';
import WinnersView from './winnersView';
import GarageView from './garageView';
import NavElement from '../components/navElements';
import BaseComponentGenerator from '../components/baseComponent';

export default class AppView {
  constructor(private root: HTMLElement) {
    this.root = root;
  }

  init() {
    this.createNavigation();
    this.createPages();
    const router = Router();
    router.init();
  }

  createNavigation(): void {
    const nav = new BaseComponentGenerator({
      tag: 'nav',
      classNames: ['nav'],
    });
    const ul = new BaseComponentGenerator({
      tag: 'ul',
      classNames: ['nav_list'],
    });
    const garageNav = new NavElement(['nav_garage', 'nav_link'], 'TO GARAGE', {
      href: '#garage',
    });
    const winnersNav = new NavElement(
      ['nav_winners', 'nav_link'],
      'TO WINNERS',
      { href: '#winners' }
    );
    ul.appendChildren([garageNav.getNavElement(), winnersNav.getNavElement()]);
    nav.appendElement(ul);
    this.root.appendChild(nav.getElement());
  }

  createPages(): void {
    this.root.appendChild(new GarageView().getGarage());
    this.root.appendChild(new WinnersView().getwinners());
  }
}
