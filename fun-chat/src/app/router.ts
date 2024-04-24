import AboutPage from './pages/about/about';
import MainPage from './pages/main/main';
import LoginForm from './pages/login-form/form';
import PageWrap from './page-wrap';
import { Routes, ResponseData } from './types/types';
import RequestTypes from './types/requests';

const WEBSOCKET_URL = 'ws://127.0.0.1:4000';

export default class Router {
  private routes: Routes;

  private root: HTMLElement;

  private pageWrap: PageWrap;

  private prevUrl: string;

  private url: string;

  private socket: WebSocket;

  constructor(root: HTMLElement) {
    this.root = root;
    this.pageWrap = new PageWrap();
    this.routes = {};
    this.socket = new WebSocket(WEBSOCKET_URL);
    this.url = '';
    this.prevUrl = '';
  }

  initialize() {
    this.setupRoutes();
    this.routeButtons();
    window.addEventListener('popstate', () => this.render());
    this.render();
    this.setupWebSocket();
  }

  private setupRoutes() {
    this.routes = {
      '/': () => this.renderLogin(),
      '/about': () => this.renderAbout(),
      '/main': () => this.renderMain(),
    };
  }

  private routeButtons() {
    document.addEventListener('click', (e) => {
      const routeButton = e.target as HTMLElement;
      switch (routeButton.className) {
        case 'aboutBtn':
          this.prevUrl = this.url;
          this.changeUrl('/about');
          break;
        case 'backBtn':
          this.changeUrl(this.prevUrl);
          break;

        default:
          break;
      }
    });
  }

  private changeUrl(newUrl: string) {
    this.url = newUrl;
    window.history.pushState({ path: this.url }, '', this.url);
    this.render();
  }

  private render() {
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
    const loginForm = new LoginForm(this.socket);
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
    const mainPage = new MainPage(this.socket);
    mainPage.initialize();
    this.pageWrap.getWrap().appendChild(mainPage.getMain());
    this.root.appendChild(this.pageWrap.getWrap());
  }

  private setupWebSocket() {
    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);
        this.handleWebSocketMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    this.socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  private handleWebSocketMessage(data: ResponseData) {
    switch (data.type) {
      case RequestTypes.USER_LOGIN:
        if (data.payload.user && data.payload.user.isLogined) {
          console.log('Authentication successful');
          this.changeUrl('/main');
        }
        break;
      case RequestTypes.ERROR:
        console.log(data.payload.error);
        document.querySelectorAll('.inputError');
        if (document.querySelectorAll('.inputError') && data.payload.error) {
          document.querySelectorAll('.inputError')[0].textContent =
            data.payload.error;
        }
        break;
      case RequestTypes.USER_LOGOUT:
        sessionStorage.clear();
        this.changeUrl('/');
        break;
      default:
        break;
    }
  }
}
