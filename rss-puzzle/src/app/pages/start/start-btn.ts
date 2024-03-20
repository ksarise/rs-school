/* eslint-disable import/no-cycle */
import ButtonElement from '../../components/button';
import { pageWrapper } from '../../app';
import GamePage from '../game/game-page';
import Header from '../../components/header';

const startBtn = new ButtonElement(
  'start-btn',
  'Start',
  { type: 'button' },
  () => {}
);
startBtn.getButton().addEventListener('click', () => {
  pageWrapper.cleanWrap();
  const gamePage = new GamePage();
  const header = new Header();
  pageWrapper.getWrap().appendChild(header.getHeader());
  pageWrapper.getWrap().appendChild(gamePage.getGamePage());
});
export default startBtn;
