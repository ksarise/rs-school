/* eslint-disable import/no-cycle */
import PageWrap from './page-wrap';
import LoginForm from './components/pages/login-form/form';
import Header from './components/header';
import StartPage from './components/pages/start/start-page';

const BODY = document.body;
const pageWrapper = new PageWrap();

export default function app() {
  pageWrapper.cleanWrap();
  BODY.appendChild(pageWrapper.getWrap());
  if (localStorage.getItem('ksarisePuzzleSession')) {
    pageWrapper.cleanWrap();
    const header = new Header();
    const startPage = new StartPage();
    pageWrapper.getWrap().appendChild(header.getHeader());
    pageWrapper.getWrap().appendChild(startPage.getStart());
  } else {
    pageWrapper.cleanWrap();
    const form = new LoginForm();
    pageWrapper.getWrap().appendChild(form.getForm());
  }
}
