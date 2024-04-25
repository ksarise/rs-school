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

  socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
    const formGen = new BaseComponentGenerator({
      tag: 'form',
      classNames: ['loginForm'],
    });
    this.form = formGen.getElement() as HTMLFormElement;
    this.firstNameBlock = new NameBlock(['firstName'], 'Name', 'text', () =>
      this.unblockButton()
    );
    this.passwordBlock = new NameBlock(
      ['password'],
      'Password',
      'password',
      () => this.unblockButton()
    );

    this.loginBtn = new ButtonElement(['loginBtn'], 'Login', {
      disabled: 'true',
      type: 'button',
    });
    this.aboutBtn = new ButtonElement(['aboutBtn'], 'About', {
      type: 'button',
    });
    formGen.appendChildren([
      this.firstNameBlock.getBlock(),
      this.passwordBlock.getBlock(),
      this.loginBtn.getButton(),
      this.aboutBtn.getButton(),
    ]);
    this.loginBtn
      .getButton()
      .addEventListener('click', this.handleFormSubmission.bind(this));
    this.form.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleFormSubmission(event);
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

  private handleFormSubmission(event: Event) {
    event.preventDefault();
    const firstNameValid = this.firstNameBlock
      .getBlock()
      .classList.contains('valid');
    const passwordValid = this.passwordBlock
      .getBlock()
      .classList.contains('valid');
    if (firstNameValid && passwordValid) {
      FormSubmit(
        event,
        this.firstNameBlock.NameInput.getElement().value,
        this.passwordBlock.NameInput.getElement().value,
        this.socket
      );
    }
  }
}
