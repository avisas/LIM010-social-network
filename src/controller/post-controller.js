/* eslint-disable import/no-cycle */
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import { dataBase } from '../main.js';
import { addPostFirebase, deletePostFirebase, editPostFirebase } from '../controller-firebase/controller-post.js';
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
      console.log(querySnapshot.size);
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

/* export const showPost = (tabla) => {
  dataBase.collection('post').orderBy('timePost', 'desc').onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      showButtonLike(doc.id);
      // console.log(`${doc.id} => ${doc.data().userName}`);
      tabla.innerHTML += `
      <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().userName}</td>
          <td>${doc.data().notes}</td>
          <td>${doc.data().timePost}</td>
          <td>${doc.data().privacidad}</td>
          <td><button id="${doc.id}" name="edit" data-note="${doc.data().notes}" data-privacidad="${doc.data().privacidad}" class="edit">Editar</button></td>
          <td><button id="${doc.id}" name="delete" class="delete">Eliminar</button></td>
          <td><button id="like-${doc.id}" data-post="${doc.id}" class="like">Like</button></td>
          <td><button  id="dislike-${doc.id}" data-post="${doc.id}" class="dislike">DisLike</button></td>
          <td id="counter-${doc.id}"></td>
        </tr>
        `;
      showLikePost(doc.id);
    });

    const buttonDeletePost = document.querySelectorAll('.delete');
    // eslint-disable-next-line no-restricted-syntax
    for (const button of buttonDeletePost) {
      button.addEventListener('click', deletePost);
    }

    const buttons = document.querySelectorAll('.edit');
    // eslint-disable-next-line no-restricted-syntax
    for (const button of buttons) {
      button.addEventListener('click', edit);
    }

    const likes = document.querySelectorAll('.like');
    // eslint-disable-next-line no-restricted-syntax
    for (const button of likes) {
      button.addEventListener('click', addLike);
    }

    const dislikes = document.querySelectorAll('.dislike');
    // eslint-disable-next-line no-restricted-syntax
    for (const button of dislikes) {
      button.addEventListener('click', deleteLikePost);
    }
  });
}; */

/* export const listNotes (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
  <span class="">
    <span>${objNote.userName}</span>
    <span>${objNote.notes}</span>
    <span>${objNote.timePost}</span>
    <span>${objNote.privacidad}</span>
  </span>
  <a class="" id="${objNote.id}">
  <i>Delete</i>
  </a>
  `;
  liElemnt.querySelector(`#${objNote.id}`)
  .addEventListener('click', () => deletePost);
  return liElemnt;
}; */
