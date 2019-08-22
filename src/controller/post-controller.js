/* eslint-disable import/no-cycle */
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import { addPostFirebase, deletePostFirebase, editPostFirebase } from '../controller-firebase/controller-post.js';
import { addLikeFirebase, deleteLikeFirebase, showLikeFirebase, addCommentFirebase, editCommentFirebase } from '../controller-firebase/controller-likes.js';

export const savePost = (event) => {
  event.preventDefault();
  const notePost = document.querySelector('#publication').value;
  const selectedPrivacidad = document.querySelector('#privacidad').value;
  const user = userCurrent();
  addPostFirebase(notePost, selectedPrivacidad, user)
    .then(() => {
      alert('Publicacion ingresada');
      // console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const saveComment = (postId) => {
  event.preventDefault();
  const noteComment = document.querySelector(`#commentario-${postId}`).value;
  const user = userCurrent();
  addCommentFirebase(user, postId, noteComment)
    .then(() => {
      alert('comentario ingresado');
      // console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const deletePost = (id) => {
  deletePostFirebase(id)
    .then(() => {
      deletePostFirebase(id);
      // console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const edit = (id) => {
  const textPost = document.querySelector(`#text-${id}`);
  const boton = document.querySelector('#edit-post');
  const selectPrivacity = document.querySelector(`#selectPriv-${id}`);
  const botonGuardar = document.querySelector('#compartir-post');
  textPost.disabled = false;
  selectPrivacity.disabled = false;
  boton.classList.remove('hide');
  botonGuardar.classList.add('hide');
  boton.value = 'Editar';
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    const note = textPost.value;
    const selectedPrivacidad = selectPrivacity.value;
    editPostFirebase(id, note, selectedPrivacidad)
      .then(() => {
        boton.classList.add('hide');
        botonGuardar.classList.remove('hide');
      })
      .catch(() => {
        // The document probably doesn't exist.
        // console.error('Error updating document: ', error);
      });
  });
};


export const editComment = (idComment, idPost) => {
  const textComment = document.querySelector(`#textcomment-${idComment}`);
  textComment.disabled = false;
  const boton = document.querySelector(`#savecomment-${idComment}`);
  // const boton = document.querySelector(`#editco-${idPost}`);
  const botonEditar = document.querySelector(`#edit-${idComment}`);

  boton.classList.remove('hide');
  botonEditar.classList.add('hide');
  // boton.value = 'Editar';
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    const note = textComment.value;
    editCommentFirebase(idPost, idComment, note)
      .then(() => {
        boton.classList.add('hide');
        botonEditar.classList.remove('hide');
      })
      .catch(() => {
        // The document probably doesn't exist.
        // console.error('Error updating document: ', error);
      });
  });
};

export const showLikePost = (list, id) => {
  const buttonLike = list.querySelector(`#like-${id}`);
  const buttonDislike = list.querySelector(`#dislike-${id}`);
  const user = userCurrent();
  showLikeFirebase(id)
    .onSnapshot((querySnapshot) => {
      document.getElementById(`counter-${id}`).innerHTML = querySnapshot.size;
      querySnapshot.forEach((doc) => {
        console.log(querySnapshot.size);
        if (doc.data().idUser !== user.uid || !doc.exists) {
          buttonLike.classList.remove('hide');
          buttonDislike.classList.add('hide');
        } else {
          buttonLike.classList.add('hide');
          buttonDislike.classList.remove('hide');
        }
      });
    });
};

export const deleteLikePost = (postId) => {
  const user = userCurrent();
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  deleteLikeFirebase(user, postId)
    .then(() => {
      buttonDislike.classList.add('hide');
      buttonLike.classList.remove('hide');
    });
};

/* Funcion de guardar like */
export const addLike = (postId) => {
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  const user = userCurrent();
  addLikeFirebase(user, postId)
    .then(() => {
      buttonDislike.classList.remove('hide');
      buttonLike.classList.add('hide');
    });
};
