import BaseComponentGenerator from './base-component';
// TODO: make separate label/input/button class
export default function loginForm() {
  const firstNameBlock = new BaseComponentGenerator({
    tag: 'div',
    className: 'firstNameBlock',
  });
  const firstNameLabel = new BaseComponentGenerator({
    tag: 'label',
    className: 'firstNameLabel',
    content: 'First Name',
  });
  firstNameBlock.appendElement(firstNameLabel.getElement());
  const firstNameInput = new BaseComponentGenerator({
    tag: 'input',
    className: 'firstNameInput',
    attributes: { required: '' },
  });
  firstNameBlock.appendElement(firstNameInput.getElement());

  const lastNameBlock = new BaseComponentGenerator({
    tag: 'div',
    className: 'lastNameBlock',
  });
  const lastNameLabel = new BaseComponentGenerator({
    tag: 'label',
    className: 'lastNameLabel',
    content: 'Last Name',
  });
  lastNameBlock.appendElement(lastNameLabel.getElement());
  const lastNameInput = new BaseComponentGenerator({
    tag: 'input',
    className: 'lastNameInput',
    attributes: { required: '' },
  });
  lastNameBlock.appendElement(lastNameInput.getElement());

  const loginBtn = new BaseComponentGenerator({
    tag: 'button',
    className: 'login-button',
    content: 'Login',
    attributes: { type: 'submit' },
  });

  const form = new BaseComponentGenerator({
    tag: 'form',
    className: 'login-form',
  });
  form.appendElement(firstNameBlock.getElement());
  form.appendElement(lastNameBlock.getElement());
  form.appendElement(loginBtn.getElement());

  return form.getElement();
}
