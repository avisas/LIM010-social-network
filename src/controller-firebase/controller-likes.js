/* eslint-disable import/no-cycle */
import { dataBase } from '../main.js';

export const addLikeFirebase = (user, postId) => {
  return dataBase.collection('post').doc(postId).collection('likes').doc(user.uid)
    .set({
      idUser: user.uid,
      emailUser: user.displayName,
      idPost: postId,
    });
};

export const deleteLikeFirebase = (user, postId) => {
  return dataBase.collection('post').doc(postId).collection('likes')
    .doc(user.uid)
    .delete();
};
