import { changeView } from './controller-view/index.js'

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
}

window.addEventListener('load', init);