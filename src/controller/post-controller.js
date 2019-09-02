/* eslint-disable import/no-cycle */
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import {
  addPostFirebase, deletePostFirebase, editPostFirebase, showPostFirebase,
  showPostUserFirebase, uploadImage,
} from '../controller-firebase/controller-post.js';
import {
  addLikeFirebase, deleteLikeFirebase, showLikeFirebase, addCommentFirebase, editCommentFirebase,
} from '../controller-firebase/controller-likes.js';
import { home } from '../views/home-view.js';
import { myPost } from '../views/myPost-view.js';
import { modalMessage } from './home-controller.js';

export const savePost = (event) => {
  event.preventDefault();
  const notePost = document.querySelector('#publication').value;
  const selectedPrivacidad = document.querySelector('#privacidad').value;
  const fileButton = document.querySelector('#fileButton');
  const uploader = document.querySelector('#uploader');
  const user = userCurrent();
  const userUid = user.uid;
  const userName = user.displayName;
  if (notePost !== '') {
    if (fileButton.files[0] === undefined) {
      addPostFirebase(notePost, selectedPrivacidad, userUid, userName, '')
        .then(() => {
          const modalTitle = 'Nuevo Registro';
          const modalContent = 'Publicación ingresada';
          modalMessage(modalTitle, modalContent, '#a5bf48ed');
        });
    } else {
      // console.log(uploadImage(fileButton.files[0]));
      uploadImage(fileButton.files[0], uploader)
        .then(url => addPostFirebase(notePost, selectedPrivacidad, userUid, userName, url));
      const modalTitle = 'Nuevo Registro';
      const modalContent = 'Publicación ingresada';
      modalMessage(modalTitle, modalContent, '#a5bf48ed');
    }
  } else {
    const modalTitle = 'Error de Registro';
    const modalContent = 'Ingresé el contenido que deseé compartir';
    modalMessage(modalTitle, modalContent, '#fa5457');
  }
};

export const saveComment = (postId) => {
  const noteComment = document.querySelector(`#commentario-${postId}`).value;
  const user = userCurrent();
  const userUid = user.uid;
  const userName = user.displayName;
  if (noteComment !== '') {
    addCommentFirebase(userUid, userName, postId, noteComment)
      .then(() => {
      }).catch((error) => {
        const modalTitle = 'Error Nuevo Comentario';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent, '#a5bf48ed');
      });
  } else {
    const modalTitle = 'Error de Registro';
    const modalContent = 'Ingresé un comentario en la caja de texto';
    modalMessage(modalTitle, modalContent, '#fa5457');
  }
};

export const deletePost = (id) => {
  deletePostFirebase(id)
    .then(() => {
      const modalTitle = 'Eliminar publicación';
      const modalContent = 'La publicación se elimino con éxito';
      modalMessage(modalTitle, modalContent);
    }).catch((error) => {
      const modalTitle = 'Error Eliminar Publicación';
      const modalContent = `Error adding document:${error}`;
      modalMessage(modalTitle, modalContent);
    });
};

export const edit = (id) => {
  const textPost = document.querySelector(`#text-${id}`);
  const selectPrivacity = document.querySelector(`#selectPriv-${id}`);
  const botonGuardar = document.querySelector(`#edit-${id}`);
  const boton = document.querySelector(`#save-post-${id}`);

  textPost.disabled = false;
  selectPrivacity.disabled = false;
  textPost.focus();
  boton.classList.remove('hide');
  botonGuardar.classList.add('hide');
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    const note = textPost.value;
    const selectedPrivacidad = selectPrivacity.value;
    editPostFirebase(id, note, selectedPrivacidad)
      .then(() => {
        const modalTitle = 'Editar Publicación';
        const modalContent = 'Los cambios se guardaron satisfactoriamente';
        modalMessage(modalTitle, modalContent, '#a5bf48ed');
        boton.classList.add('hide');
        botonGuardar.classList.remove('hide');
      })
      .catch((error) => {
        const modalTitle = 'Error Editar Publicación';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent);
      });
  });
};

export const editComment = (idComment, idPost) => {
  const textComment = document.querySelector(`#textcomment-${idComment}`);
  textComment.disabled = false;
  textComment.style.backgroundColor = '#fefefe';
  const boton = document.querySelector(`#savecomment-${idComment}`);
  const botonEditar = document.querySelector(`#edit-${idComment}`);

  boton.classList.remove('hide');
  botonEditar.classList.add('hide');
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    textComment.style.backgroundColor = '#f2eeed';
    textComment.disabled = true;
    const note = textComment.value;
    editCommentFirebase(idPost, idComment, note)
      .then(() => {
        boton.classList.add('hide');
        botonEditar.classList.remove('hide');
      })
      .catch((error) => {
        const modalTitle = 'Error Editar Comentario';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent);
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
        // console.log(querySnapshot.size);
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
  const user = userCurrent().uid;
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
  const userUid = user.uid;
  const userName = user.displayName;
  addLikeFirebase(userUid, userName, postId)
    .then(() => {
      buttonDislike.classList.remove('hide');
      buttonLike.classList.add('hide');
    });
};
export const allNotes = (content) => {
  const contentPost = content.querySelector('#content-post');
  showPostFirebase((notes) => {
    contentPost.innerHTML = '';
    contentPost.appendChild(home(notes));
  });
};

export const myPostNotes = (content1) => {
  const contentPost = content1.querySelector('#content-post');
  firebase.auth().onAuthStateChanged((user) => {
    const userUid = user.uid;
    showPostUserFirebase(userUid, (myPostnotes) => {
      contentPost.innerHTML = '';
      contentPost.appendChild(myPost(myPostnotes));
    });
  });
};
