/* eslint-disable import/no-cycle */
import { dataBase } from '../main.js';

const datePost = () =>{
  const opt1 = {
    month: 'long', day: 'numeric', year: 'numeric',
  };
  const opt2 = {
    hour12: 'true', hour: 'numeric', minute: 'numeric',
  };
  const date = new Date().toLocaleDateString('es-Es', opt1);
  const time = new Date().toLocaleTimeString('es-Es', opt2);
  const dataTime = `${date} - ${time}`;
  console.log(dataTime);
  return dataTime;
}

export const addPostFirebase = (notePost, selectPrivacidad, user, imgUrl) => {
  return dataBase.collection('post').add({
    notes: notePost,
    privacidad: selectPrivacidad,
    user: user.uid,
    userName: user.displayName,
    timePost: datePost(),
    img: imgUrl,
  });
};

export const deletePostFirebase = (id) => {
  return dataBase.collection('post').doc(id).delete();
};

export const editPostFirebase = (id, note, selectedPrivacidad) => {
  return dataBase.collection('post').doc(id).update({
    notes: note,
    privacidad: selectedPrivacidad,
    // timePost: (new Date()).toGMTString(),
    timePost: datePost(),
  });
};

export const showPostFirebase = (callback) => {
  return dataBase.collection('post').where('privacidad', '==', 'publico').orderBy('timePost', 'desc').onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
};

export const showPostUserFirebase = (callback) => {
  return firebase.auth().onAuthStateChanged(user => dataBase.collection('post').where('user', '==', user.uid).orderBy('timePost', 'desc')
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    }));
};

export const uploadImage = (file) => {
    // Create a storage reference
    const postImageRef = firebase.storage().ref().child(`images/${file.name}`);
    return postImageRef.put(file)
    .then(snapshot => snapshot.ref.getDownloadURL());
}