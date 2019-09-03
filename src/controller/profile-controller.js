/* eslint-disable import/no-cycle */
// import { dataBase } from '../main.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

export const updateUserName = (user, newName) => user.updateProfile({
  displayName: newName,
  // photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
}).catch(() => {
  // console.log(error);
});

export const getData = (name, email, job, descriptionText) => {
  const user = userCurrent();
  firebase.firestore().collection('users').doc(user.uid).onSnapshot((doc) => {
    name.value = doc.data().name;
    email.value = doc.data().email;
    job.value = doc.data().job;
    descriptionText.value = doc.data().description;
  });
};

export const updateProfile = (nameUser, emailUser, jobUser, descriptionUser) => {
  const user = userCurrent();
  const userProfile = firebase.firestore().collection('users').doc(user.uid);
  user.updateProfile({
    displayName: nameUser,

  });

  return userProfile.update({
    name: nameUser,
    email: emailUser,
    job: jobUser,
    description: descriptionUser,
  }).then(() => {
    // const user = userCurrent();
    // console.log('Document successfully updated!');

  }).catch(() => {
    // The document probably doesn't exist.
    // console.error('Error updating document: ', error);
  });
};

export const recoverDataProfile = (textJob, textDescription) => {
  firebase.auth().onAuthStateChanged((user) => {
    firebase.firestore().collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          // console.log(doc.data().job);
          // console.log(doc.data().description);

          textJob.innerHTML = doc.data().job;
          textDescription.innerHTML = doc.data().description;
        } else {
          // doc.data() will be undefined in this case
          // console.log('No such document!');
        }
      })
      .catch(() => {
        // console.log('Error getting document:', error);
      });
  });
};
