import { components } from '../views/index.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '': container.appendChild(components.login());
      break;
    case '#/': container.appendChild(components.login());
      break;
    case '#/register': container.appendChild(components.register());
      break;

    case '#/codeMeet': container.appendChild(components.codeMeet());
      break;

    case '#/profile': container.appendChild(components.profile());
      break;
    default: break;
  }
};
