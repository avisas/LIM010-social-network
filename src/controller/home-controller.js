import { signOutLogin } from '../controller-firebase/controller-authentication.js';

export const recoverUserName = (userName, userProfileName, UserPhoto) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const displayName = `<span class="icon-user"></span>${user.displayName}`;
      const displayUserName = user.displayName;
      const userPhoto = user.photoURL;
      const userEmail = user.email;
      if (displayName === null) {
        userName.textContent = userEmail;
      } else {
        userName.innerHTML = displayName;
        userProfileName.innerHTML = displayUserName;
        UserPhoto.src = userPhoto;
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
 document.location.hash = '#/myPost';
};
export const changeViewToHome = () => {
  window.location.hash = '#/home';
};