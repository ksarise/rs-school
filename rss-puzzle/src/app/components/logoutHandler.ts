/* eslint-disable import/no-cycle */
import app from '../app';

const logoutHandler = () => {
  localStorage.removeItem('ksarisePuzzleSession');
  app();
};
export default logoutHandler;
