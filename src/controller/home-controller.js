/* eslint-disable brace-style */
import { signOutLogin } from '../controller-firebase/controller-authentication.js';

export const recoverUserName = (userName, userProfileName, UserPhotoProfile) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const displayName = `<span class="icon-user"></span>${user.displayName}`;
      const displayUserName = user.displayName;
      const userPhoto = user.photoURL;
      if (userPhoto === null) {
        userName.innerHTML = displayName;
        userProfileName.innerHTML = displayUserName;
        UserPhotoProfile.src = 'https://icon-library.net/images/avatar-icon-png/avatar-icon-png-16.jpg';
      }
      else {
        userName.innerHTML = displayName;
        userProfileName.innerHTML = displayUserName;
        UserPhotoProfile.src = userPhoto;
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