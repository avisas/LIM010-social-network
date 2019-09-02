/* eslint-disable import/no-cycle */
// import { dataBase } from '../main.js';
import { datePost } from './controller-post.js';

export const addLikeFirebase = (user, postId) => firebase.firestore().collection('post').doc(postId).collection('likes')
  .doc(user.uid)
  .set({
    idUser: user.uid,
    nameUser: user.displayName,
    idPost: postId,
  });

export const deleteLikeFirebase = (user, postId) => firebase.firestore().collection('post').doc(postId).collection('likes')
  .doc(user.uid)
  .delete();

export const showLikeFirebase = idPost => firebase.firestore().collection('post').doc(idPost).collection('likes');

export const addCommentFirebase = (user, postId, text) => firebase.firestore().collection('post').doc(postId).collection('comment')
  .add({
    idUser: user.uid,
    nameUser: user.displayName,
    comment: text,
    idPost: postId,
    timePost: datePost(),
  });

export const deleteCommentFirebase = (idPost, idComment) => firebase.firestore().collection('post').doc(idPost).collection('comment')
  .doc(idComment)
  .delete();

export const editCommentFirebase = (idPost, idComment, commentEdit) => firebase.firestore().collection('post').doc(idPost).collection('comment')
  .doc(idComment)
  .update({
    comment: commentEdit,
  });

export const getAllComments = (idPost, callback) => {
  firebase.firestore().collection('post').doc(idPost).collection('comment')
    .orderBy('timePost', 'desc')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};
