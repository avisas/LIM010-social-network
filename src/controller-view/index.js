/* eslint-disable import/no-cycle */
import { components } from '../views/index.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  // const sessionUser = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  // FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

  container.innerHTML = '';
  switch (route) {
    case '#/': container.appendChild(components.login());
      break;
    case '#/register': container.appendChild(components.register());
      break;
    case '#/home': container.appendChild(components.home());
      break;
    case '#/profile': container.appendChild(components.profile());
      break;
    default: break;
  }
};
