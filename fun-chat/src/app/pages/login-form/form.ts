import BaseComponentGenerator from '../../components/base-component';
import NameBlock from './name-blocks';
import ButtonElement from '../../components/button';
import FormSubmit from './submitHandler';

export default class LoginForm {
  private form: HTMLFormElement;

  private firstNameBlock: NameBlock;

  private passwordBlock: NameBlock;

  private loginBtn: ButtonElement;

  private aboutBtn: ButtonElement;

  constructor() {
    const formGen = new BaseComponentGenerator({
      tag: 'form',
      className: 'loginForm',
    });
    this.form = formGen.getElement() as HTMLFormElement;
    this.firstNameBlock = new NameBlock('firstName', 'Name', 'text', () =>
      this.unblockButton()
    );
    this.passwordBlock = new NameBlock('password', 'Password', 'password', () =>
      this.unblockButton()
    );

    this.loginBtn = new ButtonElement(
      'loginBtn',
      'Login',
      { disabled: 'true', type: 'button' },
      () => {}
    );
    this.aboutBtn = new ButtonElement(
      'aboutBtn',
      'About',
      { type: 'button' },
      () => {}
    );
    console.log(this.loginBtn);
    formGen.appendChildren([
      this.firstNameBlock.getBlock(),
      this.passwordBlock.getBlock(),
      this.loginBtn.getButton(),
      this.aboutBtn.getButton(),
    ]);
    const handleFormSubmission = (event: Event) => {
      event.preventDefault();
      FormSubmit(
        event,
        this.firstNameBlock.NameInput.getElement().value,
        this.passwordBlock.NameInput.getElement().value
      );
    };
    this.form.addEventListener('click', handleFormSubmission);
    this.form.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        handleFormSubmission(event);
      }
    });
  }

  public getForm(): HTMLElement {
    return this.form;
  }

  public unblockButton() {
    this.loginBtn.getButton().disabled = !(
      this.firstNameBlock.getBlock().classList.contains('valid') &&
      this.passwordBlock.getBlock().classList.contains('valid')
    );
  }
}
