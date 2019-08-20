import { signOutLogin } from '../controller-firebase/controller-authentication.js';

export const recoverUserName = (userName) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const displayName = user.displayName;
      // let userPhoto = user.photoURL;
      const userEmail = user.email;
      if (displayName === null) {
        userName.textContent = userEmail;
      } else {
        userName.textContent = displayName;
      }
    }
  });
};

export const signOutUser = () => {
  signOutLogin().then(() => {
    window.location.hash = '#/';
  }, () => {
    // console.log(error);
  });
};
export const changeViewToProfile = () => {
  window.location.hash = '#/profile';
};

const menuHamb = homeDiv.querySelector('#menu-hamb');
const hambMostrar = homeDiv.querySelector('#hamb-mostrar');
const modoMenu = 0;

menuHamb.addEventListener('click', );
hambMostrar.addEventListener('click', );