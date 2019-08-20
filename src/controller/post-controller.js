/* eslint-disable import/no-cycle */
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import { dataBase } from '../main.js';
import { addPostFirebase, deletePostFirebase, editPostFirebase, showPostUserFirebase } from '../controller-firebase/controller-post.js';
import { addLikeFirebase, deleteLikeFirebase, showLikeFirebase } from '../controller-firebase/controller-likes.js';

export const savePost = (event) => {
  event.preventDefault();
  const notePost = document.querySelector('#publication').value;
  // const time = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
  const selectedPrivacidad = document.querySelector('#privacidad').value;
  const user = userCurrent();
  addPostFirebase(notePost, selectedPrivacidad, user)
    .then(() => {
      alert('Publicacion ingresada');
      // console.log('Document written with ID: ', docRef.id);
    }).catch(() => {
      console.error('Error adding document: ', error);
    });
};

/* export const misPost = () => {
  const user = userCurrent();
  console.log(user);
  showPostUserFirebase((user, notes) => {
    container.innerHTML = '';
    container.appendChild(components.home(notes));
  });
}; */

export const deletePost = (id) => {
  //event.preventDefault();
  // const id = event.target.id;
  deletePostFirebase(id)
    .then(() => {
      alert('Publicacion borrada');
      // console.log('Document written with ID: ', docRef.id);
    }).catch(() => {
      console.error('Error adding document: ', error);
    });
};

export const edit = (id) => {
  // event.preventDefault();
  // const id = event.target.id;
  const notes = event.currentTarget.dataset.note;
  const privacidad = event.currentTarget.dataset.privacidad;
  document.querySelector('#publication').value = notes;
  document.querySelector('#privacidad').value = privacidad;
  const boton = document.querySelector('#edit-post');
  const botonGuardar = document.querySelector('#compartir-post');
  boton.classList.remove('hide');
  botonGuardar.classList.add('hide');
  boton.value = 'Editar';
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    const note = document.querySelector('#publication').value;
    const selectedPrivacidad = document.querySelector('#privacidad').value;
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

const showButtonLike = (postId) => {
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  const user = userCurrent();
  dataBase.collection('post').doc(postId).collection('likes').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((post) => {
      console.log(post.data().idUser);
      console.log(user.uid);
      if (post.data().idUser !== user.uid) {
        console.log('entree');
        // buttonLike.classList.add('hide');
        buttonDislike.classList.add('hide');
        // buttonDislike.classList.remove('hide');
      } else {
        console.log('no entree');
        // buttonDislike.classList.add('hide');
        buttonLike.classList.add('hide');
      }
    });
  });
};

export const showLikePost = (id) => {
  showLikeFirebase(id)
    .onSnapshot((querySnapshot) => {
      document.getElementById(`counter-${id}`).innerHTML = querySnapshot.size;
    });
};

export const deleteLikePost = (postId) => {
  const user = userCurrent();
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  deleteLikeFirebase(user, postId)
    .then(() => {
      // buttonDislike.classList.add('hide');
      // buttonLike.classList.remove('hide');
    });
};

/* Funcion de guardar like */
export const addLike = (postId) => {
  // e.preventDefault();
  // const postId = e.currentTarget.dataset.post;
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  const user = userCurrent();
  addLikeFirebase(user, postId)
    .then(() => {
      // buttonDislike.classList.remove('hide');
      // buttonLike.classList.add('hide');
    });
};
