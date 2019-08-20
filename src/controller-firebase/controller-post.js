/* eslint-disable import/no-cycle */
import { dataBase } from '../main.js';

export const addPostFirebase = (notePost, selectPrivacidad, user) => {
  return dataBase.collection('post').add({
    notes: notePost,
    privacidad: selectPrivacidad,
    user: user.uid,
    userName: user.displayName,
    timePost: (new Date()).toLocaleDateString(),
  });
};

export const deletePostFirebase = (id) => {
  return dataBase.collection('post').doc(id).delete();
};

export const editPostFirebase = (id, note, selectedPrivacidad) => {
  return dataBase.collection('post').doc(id).update({
    notes: note,
    privacidad: selectedPrivacidad,
    timePost: (new Date()).toLocaleDateString(),
  });
};

export const showPostFirebase = (callback) => {
  return dataBase.collection('post').orderBy('timePost', 'desc').onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
};
