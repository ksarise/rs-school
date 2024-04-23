import AboutPage from './pages/about/about';
import MainPage from './pages/main/main';
import LoginForm from './pages/login-form/form';
import PageWrap from './page-wrap';
import { Routes } from './types/types';

export default class Router {
  private routes: Routes;

  private root: HTMLElement;

  private pageWrap: PageWrap;

  prevUrl: string;

  url: string;

  constructor(root: HTMLElement) {
    this.root = root;
    this.pageWrap = new PageWrap();
    this.routes = {};
    this.url = '';
    this.prevUrl = '';
  }

  initialize() {
    this.routes = {
      '/': () => this.renderLogin(),
      '/about': () => this.renderAbout(),
      '/main': () => this.renderMain(),
    };
    this.routeButtons();
    window.addEventListener('popstate', () => this.render());
    this.render();
  }

  routeButtons() {
    document.addEventListener('click', (e) => {
      const routeButton = e.target as HTMLButtonElement;
      switch (routeButton.className) {
        case 'aboutBtn':
          this.prevUrl = this.url;
          this.changeUrl('/about');
          break;
        case 'backBtn':
          this.changeUrl(this.prevUrl);
          break;
        case 'loginBtn':
          this.prevUrl = this.url;
          this.changeUrl('/main');
          break;
        case 'logoutBtn':
          sessionStorage.clear();
          this.changeUrl('/');
          break;
        default:
          break;
      }
    });
  }

  changeUrl(newUrl: string) {
    this.url = newUrl;
    window.history.pushState({ path: this.url }, '', this.url);
    this.render();
  }

  render() {
    const path = window.location.pathname;
    this.url = path;
    if (path === '/main' && !sessionStorage.getItem('ksariseUser')) {
      this.changeUrl('/');
    } else {
      this.routes[path]();
    }
  }

  renderLogin() {
    this.pageWrap.cleanWrap();
    const loginForm = new LoginForm();
    this.pageWrap.getWrap().appendChild(loginForm.getForm());
    this.root.appendChild(this.pageWrap.getWrap());
  }

  renderAbout() {
    this.pageWrap.cleanWrap();
    const aboutPage = new AboutPage();
    this.pageWrap.getWrap().appendChild(aboutPage.getAbout());
    this.root.appendChild(this.pageWrap.getWrap());
  }

  renderMain() {
    this.pageWrap.cleanWrap();
    const mainPage = new MainPage();
    this.pageWrap.getWrap().appendChild(mainPage.getMain());
    this.root.appendChild(this.pageWrap.getWrap());
  }
}
