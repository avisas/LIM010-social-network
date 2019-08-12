export const recoverUserName = (userName) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let displayName = user.displayName;
      // let userPhoto = user.photoURL;
      let userEmail = user.email;
      // console.log(displayName);
      //console.log(userEmail);
      if (displayName === null) {
        userName.textContent = userEmail;
      } else {
        userName.textContent = displayName;
      }
    }
  })
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
  const displayName='Ana', message='Hola, ¿como estas?', id='556ggyb545';
  return [{displayName, message, id}, {displayName, message, id}, {displayName, message, id}];
};