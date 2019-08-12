export const recoverUserName = (userName) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let displayName = user.displayName;
        let userPhoto = user.photoURL;
        let userEmail = user.email;
        console.log(displayName);
        console.log(userEmail);
        if(displayName === null) {
          userName.textContent = userEmail;
        }
        else {
          userName.textContent = displayName;
        }
      }
    })
  } 