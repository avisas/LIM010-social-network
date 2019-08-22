/* eslint-disable import/no-cycle */
import { dataBase } from '../main.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

export const updateUserName = (user, newName) => user.updateProfile({
  displayName: newName,
  // photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
}).catch(() => {
  // console.log(error);
});


export const getData = (name, email) => {
  const user = userCurrent();
  /* dataBase.collection('users').doc(user.uid).get().then((doc) => {
    if (doc.exists) {
      // console.log('Document data:', doc.data().name);
      name.value = doc.data().name;
      email.value = doc.data().email;
    } else {
      // doc.data() will be undefined in this case
      // console.log('No such document!');
    }
  })
    .catch(() => {
      // console.log('Error getting document:', error);
    }); */
  name.value = user.displayName;
  email.value = user.email;
};


export const updateProfile = (nameUser, emailUser) => {
  const user = userCurrent();
  const userProfile = dataBase.collection('users').doc(user.uid);

  return userProfile.update({
    name: nameUser,
    email: emailUser,
  }).then(() => {
    // const user = userCurrent();
    // console.log('Document successfully updated!');
    user.updateProfile({
      displayName: nameUser,
    });
  }).catch(() => {
    // The document probably doesn't exist.
    // console.error('Error updating document: ', error);
  });
};
