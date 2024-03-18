import PageWrap from './page-wrap';
import loginForm from './components/login-form';

const BODY = document.body;
const pageWrapper = new PageWrap();
const form = loginForm();
console.log(pageWrapper);
export default function app() {
  pageWrapper.cleanWrap();
  BODY.appendChild(pageWrapper.getWrap());
  pageWrapper.getWrap().appendChild(form);
}
