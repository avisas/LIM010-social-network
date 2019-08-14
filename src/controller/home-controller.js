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
  firebase.auth().signOut().then(() => {
    window.location.hash = '#/';
  }, (error) => {
    console.log(error);
  });
};
export const changeViewToProfile = () => {
  window.location.hash = '#/profile';
};

export const pushPublication = (event) => {
  event.preventDefault();
  const messageToPublish = event.target.publication.value;
  // push messagetoPublish to firestore
  console.log(`message prueba: ${messageToPublish}`);
};
