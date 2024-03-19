import PageWrap from './page-wrap';
import LoginForm from './components/login-form/form';
import Header from './components/header';

const BODY = document.body;
const pageWrapper = new PageWrap();
const form = new LoginForm();
const header = new Header();
console.log(pageWrapper);
export default function app() {
  pageWrapper.cleanWrap();
  BODY.appendChild(pageWrapper.getWrap());
  pageWrapper.getWrap().appendChild(header.getHeader());
  pageWrapper.getWrap().appendChild(form.getForm());
}
