import RequestTypes, { User, UsersResponse } from '../../types/requests';
import BaseComponentGenerator from '../../components/base-component';
import ButtonElement from '../../components/button';
import LogoutHandler from './logoutHandler';
import InputField from '../login-form/input-field';

export default class MainPage {
  private main: HTMLElement;

  private aboutBtn: ButtonElement;

  private logoutBtn: ButtonElement;

  private username: string = '';

  private inactiveUsers: User[];

  private activeUsers: User[];

  private userList: BaseComponentGenerator;

  private userListSearch: InputField;

  socket: WebSocket;

  constructor(socket: WebSocket) {
    this.inactiveUsers = [];
    this.activeUsers = [];
    this.socket = socket;
    this.getUsername();
    const mainGen = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['main'],
    });
    const headerGen = new BaseComponentGenerator({
      tag: 'header',
      classNames: ['header'],
    });
    const usernameGen = new BaseComponentGenerator({
      tag: 'h2',
      classNames: ['username'],
      content: `User: ${this.username}`,
    });
    const titleGen = new BaseComponentGenerator({
      tag: 'h1',
      classNames: ['title'],
      content: 'Fun Chat',
    });
    this.aboutBtn = new ButtonElement(
      ['aboutBtn'],
      'About',
      { type: 'button' },
      () => {}
    );
    this.logoutBtn = new ButtonElement(
      ['logoutBtn'],
      'Log Out',
      { type: 'button' },
      () => {}
    );
    this.logoutBtn
      .getButton()
      .addEventListener('click', (event: Event) =>
        LogoutHandler(event, this.socket)
      );
    this.userList = new BaseComponentGenerator({
      tag: 'div',
      classNames: ['userlist'],
    });
    this.userListSearch = new InputField(['userlist_search'], 'text', () =>
      this.searchUser(this.userListSearch.getElement().value)
    );
    this.userListSearch.getElement().setAttribute('placeholder', 'Search:');
    const footerGen = new BaseComponentGenerator({
      tag: 'footer',
      classNames: ['footer'],
    });
    const rssLogoGen = new BaseComponentGenerator({
      tag: 'h3',
      classNames: ['rss-logo'],
      content: 'RSSchool',
    });
    const githubGen = new BaseComponentGenerator({
      tag: 'a',
      classNames: ['github'],
      content: 'Ksarise',
      attributes: { href: 'https://github.com/ksarise' },
    });
    const yearGen = new BaseComponentGenerator({
      tag: 'p',
      classNames: ['year'],
      content: '2024',
    });
    footerGen.appendChildren([rssLogoGen, githubGen, yearGen]);
    headerGen.appendChildren([
      usernameGen,
      titleGen,
      this.aboutBtn.getButton(),
      this.logoutBtn.getButton(),
    ]);
    this.userList.appendElement(this.userListSearch.getElement());
    mainGen.appendChildren([headerGen, this.userList, footerGen]);

    this.main = mainGen.getElement() as HTMLElement;
  }

  private getUsername() {
    const data = sessionStorage.getItem('ksariseUser');
    if (data) {
      const sessionData = JSON.parse(data);
      this.username = sessionData.login;
    }
  }

  private searchUser(value: string) {
    const searchChar = value.toLowerCase();
    const items = this.userList
      .getElement()
      .querySelectorAll<HTMLDivElement>('.user');
    items.forEach((item) => {
      const text = item.textContent?.toLowerCase() || '';
      const displayStyle = text.includes(searchChar) ? 'block' : 'none';
      const searchItem = item;
      searchItem.style.display = displayStyle;
    });
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

  public getUsers(requestType: RequestTypes) {
    const payload = null;
    if (
      requestType === RequestTypes.USER_ACTIVE ||
      requestType === RequestTypes.USER_INACTIVE
    ) {
      this.socket.send(
        JSON.stringify({
          id: requestType,
          type: requestType,
          payload,
        })
      );
    }
  }

  private handleWebSocketMessage(data: UsersResponse) {
    console.log(data);
    switch (data.type) {
      case RequestTypes.USER_ACTIVE:
        this.activeUsers = data.payload.users;
        this.displayUsers(this.activeUsers, 'active');
        console.log('activemain', data.payload.users);
        break;
      case RequestTypes.USER_INACTIVE:
        this.inactiveUsers = data.payload.users;
        this.displayUsers(this.inactiveUsers, 'inactive');
        console.log('inactivemain', data.payload.users);
        break;
      default:
        break;
    }
  }

  displayUsers(allUsers: User[], status: string) {
    allUsers.forEach((user) => {
      if (this.username !== user.login) {
        const userGen = new BaseComponentGenerator({
          tag: 'div',
          classNames: ['user', `${status}`],
          content: `${user.login}`,
        }).getElement();
        this.userList.appendElement(userGen);
      }
    });
  }

  public initialize() {
    this.setupWebSocket();
    this.getUsers(RequestTypes.USER_ACTIVE);
    this.getUsers(RequestTypes.USER_INACTIVE);
  }

  public getMain(): HTMLElement {
    return this.main;
  }
}
