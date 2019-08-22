import { signOutLogin } from '../controller-firebase/controller-authentication.js';

export const recoverUserName = (userName) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const displayName = `<span class="icon-user"></span>${user.displayName}`;
      // let userPhoto = user.photoURL;
      const userEmail = user.email;
      if (displayName === null) {
        userName.textContent = userEmail;
      } else {
        userName.innerHTML = displayName;
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
export const changeViewToMyPosts = () => {
  window.location.hash = '#/myPost';
};
