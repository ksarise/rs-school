/* eslint-disable import/no-cycle */
import BaseComponentGenerator from '../../components/base-component';
import NameBlock from './name-blocks';
import ButtonElement from '../../components/button';
import FormSubmit from './submitHandler';

export default class LoginForm {
  private form: HTMLFormElement;

  private firstNameBlock: NameBlock;

  private lastNameBlock: NameBlock;

  private loginBtn: ButtonElement;

  constructor() {
    const formGen = new BaseComponentGenerator({
      tag: 'form',
      className: 'loginForm',
    });
    this.form = formGen.getElement() as HTMLFormElement;
    this.firstNameBlock = new NameBlock('firstName', 'First Name', 3, () =>
      this.unblockButton()
    );
    this.lastNameBlock = new NameBlock('lastName', 'Last Name', 4, () =>
      this.unblockButton()
    );

    this.loginBtn = new ButtonElement(
      'loginBtn',
      'Login',
      { disabled: 'true', type: 'submit' },
      () => {}
    );
    console.log(this.loginBtn);
    formGen.appendChildren([
      this.firstNameBlock.getBlock(),
      this.lastNameBlock.getBlock(),
      this.loginBtn.getButton(),
    ]);
    this.form.addEventListener('submit', (event: Event) =>
      FormSubmit(
        event,
        this.firstNameBlock.NameInput.getElement().value,
        this.lastNameBlock.NameInput.getElement().value
      )
    );
  }

  public getForm(): HTMLElement {
    return this.form;
  }

  public unblockButton() {
    this.loginBtn.getButton().disabled = !(
      this.firstNameBlock.getBlock().classList.contains('valid') &&
      this.lastNameBlock.getBlock().classList.contains('valid')
    );
  }
}
