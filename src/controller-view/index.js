import { components } from '../views/index.js'
const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/':
      {
        container.appendChild(components.login())
      }
      break;
    case '#/register':
      {
        container.appendChild(components.register())
      }
      break;
    case '#/home':
      {
        container.appendChild(components.home())
      }
      break;
    default: break;
  }
}

export { changeView }