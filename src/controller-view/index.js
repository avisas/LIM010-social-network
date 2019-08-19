/* eslint-disable import/no-cycle */
import { components } from '../views/index.js';
import { showPostFirebase } from '../controller-firebase/controller-post.js';


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
    case '#/home':
      // container.appendChild(components.home());
      showPostFirebase((notes) => {
        container.innerHTML = '';
        container.appendChild(components.home(notes));
      });
      break;
    case '#/profile': container.appendChild(components.profile());
      break;
    default: break;
  }
};
