/* eslint-disable import/no-cycle */
import PageWrap from './page-wrap';
import LoginForm from './pages/login-form/form';
import Header from './components/header';
import StartPage from './pages/start/start-page';

const BODY = document.body;
export const pageWrapper = new PageWrap();
BODY.appendChild(pageWrapper.getWrap());

export default function app() {
  pageWrapper.cleanWrap();
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
