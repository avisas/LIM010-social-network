import { dataBase } from '../main.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

export const updateUserName = (user, newName) => user.updateProfile({
  displayName: newName,
  // photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Update successful.
}).catch((error) => {
  // An error happened.
  console.log(error);
});


export const getData = (name, email) => {
  const user = userCurrent();
  dataBase.collection('users').doc(user.uid).get().then((doc) => {
    if (doc.exists) {
      console.log('Document data:', doc.data().name);
      name.value = doc.data().name;
      email.value = doc.data().email;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};


export const updateProfile = (name, email) => {
  const user = userCurrent();
  const userProfile = dataBase.collection('users').doc(user.uid);

  return userProfile.update({
    name: name,
    email: email,
  }).then(() => {
    const user = userCurrent();
    console.log('Document successfully updated!');
    user.updateProfile({
      displayName: name,
    });
  }).catch((error) => {
    // The document probably doesn't exist.
    console.error('Error updating document: ', error);
  });
};
