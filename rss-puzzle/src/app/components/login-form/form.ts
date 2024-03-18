import BaseComponentGenerator from '../base-component';
import NameBlock from './name-blocks';
import ButtonElement from '../button';

export default class LoginForm {
  private form: HTMLFormElement;

  private loginBtn: ButtonElement;

  constructor() {
    const formGen = new BaseComponentGenerator({
      tag: 'form',
      className: 'loginForm',
    });
    this.form = formGen.getElement() as HTMLFormElement;
    const firstNameBlock = new NameBlock('firstName', 'First Name');
    const lastNameBlock = new NameBlock('lastName', 'Last Name');
    this.loginBtn = new ButtonElement('loginBtn', 'Login', () => {
      console.log('Button click');
    });

    formGen.appendChildren([
      firstNameBlock.getBlock(),
      lastNameBlock.getBlock(),
      this.loginBtn.getButton(),
    ]);
  }

  public getForm(): HTMLElement {
    return this.form;
  }
}
