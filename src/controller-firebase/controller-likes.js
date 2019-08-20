/* eslint-disable import/no-cycle */
import { dataBase } from '../main.js';

export const addLikeFirebase = (user, postId) => dataBase.collection('post').doc(postId).collection('likes').doc(user.uid)
  .set({
    idUser: user.uid,
    nameUser: user.displayName,
    idPost: postId,
  });

export const deleteLikeFirebase = (user, postId) => dataBase.collection('post').doc(postId).collection('likes')
  .doc(user.uid)
  .delete();

export const showLikeFirebase = idPost => dataBase.collection('post').doc(idPost).collection('likes');

export const addCommentFirebase = (user, postId, text) => dataBase.collection('post').doc(postId).collection('comment').add({
  idUser: user.uid,
  nameUser: user.displayName,
  comment: text,
  idPost: postId,
});

export const deleteCommentFirebase = (idPost, idComment) => {
  return dataBase.collection('post').doc(idPost).collection('comment').doc(idComment)
    .delete();
};

export const editCommentFirebase = (idPost, idComment, commentEdit) => {
  return dataBase.collection('post').doc(idPost).collection('comment').doc(idComment)
    .update({
      comment: commentEdit,
    });
};

export const getAllComments = (idPost, callback) => {
  dataBase.collection('post').doc(idPost).collection('comment').onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
};
