import { dataBase } from '../main.js';

export const addPostFirebase = (notePost, selectPrivacidad, user) => {
  dataBase.collection('post').add({
    notes: notePost,
    privacidad: selectPrivacidad,
    user: user.uid,
    userName: user.displayName,
    timePost: (new Date()).toLocaleDateString(),
  });
};
