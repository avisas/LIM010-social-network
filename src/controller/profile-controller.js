import { userCurrent } from '../model/model-authentication.js';

export const updateUserName = (user, newName) => user.updateProfile({
  displayName: newName,
}).then(() => {
}).catch(() => {
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
  }).catch(() => {
  });
};

export const recoverDataProfile = (textJob, textDescription) => {
  firebase.auth().onAuthStateChanged((user) => {
    firebase.firestore().collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          textJob.innerHTML = doc.data().job;
          textDescription.innerHTML = doc.data().description;
        } else {
          textJob.innerHTML = '';
          textDescription.innerHTML = '';
        }
      })
      .catch(() => {
      });
  });
};
