/* eslint-disable import/no-cycle */
import { components } from '../views/index.js';

export const changeView = (route) => {
  const container = document.getElementById('container');

  container.innerHTML = '';
  switch (route) {
    case '#/': container.appendChild(components.login());
      break;
    case '#/register': container.appendChild(components.register());
      break;

    case '#/codeMeet': container.appendChild(components.codeMeet());
      break;

      /* case '#/home':
      container.innerHTML = '<p>aqui en home</p>';
      console.log(route);
      showPostFirebase((notes) => {
        container.innerHTML = '';
        container.appendChild(components.home(notes));
      // });  
      break; */
    
    case '#/profile': container.appendChild(components.profile());
      break;
    default: break;
  }
};
