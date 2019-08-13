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
    location.hash = '#/';
  }, function(error) {
    console.log(error);
  });
};
export const changeViewToProfile = () => { 
  location.hash = '#/profile'; 
};

export const pushPublication = (event) => {
  event.preventDefault();
  const messageToPublish = event.target.publication.value;
  // push messagetoPublish to firestore
  console.log(`message prueba: ${messageToPublish}`);
};

export const pullAllPublications = () => {
  event.preventDefault();
  // fetch all publications from Firestore, ordered from most recent to least recent.
  const displayName ='Ana', message='Hola, ¿como estas?', id='556ggyb545';
  return [{displayName, message, id}, {displayName, message, id}, {displayName, message, id}];
};
