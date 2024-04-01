import AppView from './views/appView';

const BODY = document.body;
export default function App() {
  document.addEventListener('DOMContentLoaded', () => {
    const appView: AppView = new AppView(BODY);
    appView.init();
  });
}
