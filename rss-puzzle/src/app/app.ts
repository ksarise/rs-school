import PageWrap from './page-wrap';
import LoginForm from './components/login-form/form';

const BODY = document.body;
const pageWrapper = new PageWrap();
const form = new LoginForm();
console.log(pageWrapper);
export default function app() {
  pageWrapper.cleanWrap();
  BODY.appendChild(pageWrapper.getWrap());
  pageWrapper.getWrap().appendChild(form.getForm());
}
