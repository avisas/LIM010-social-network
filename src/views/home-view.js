/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
import {
  savePost, deletePost, edit, addLike, deleteLikePost, showLikePost,
} from '../controller/post-controller.js';
import { showPostUserFirebase } from '../controller-firebase/controller-post.js';

const listNotes = (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
  <span class="">
    <span>${objNote.userName}</span>
    <span>${objNote.notes}</span>
    <span>${objNote.timePost}</span>
    <span>${objNote.privacidad}</span>
  </span>
  <a class="" id="delete-${objNote.id}">
  <i>Delete</i>
  </a>
  </span>
  <a class="" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}">
  <i>Edit</i>
  </a>
  <a class="" id="like-${objNote.id}" data-post="${objNote.id}">
  <i>Like</i>
  </a>
  <a class="" id="dislike-${objNote.id}" data-post="${objNote.id}">
  <i>Dislike</i>
  </a>
  <a id="counter-${objNote.id}">
  </a>
  `;

  liElemnt.querySelector(`#delete-${objNote.id}`)
    .addEventListener('click', () => deletePost(objNote.id));

  liElemnt.querySelector(`#edit-${objNote.id}`)
    .addEventListener('click', () => edit(objNote.id));

  liElemnt.querySelector(`#like-${objNote.id}`)
    .addEventListener('click', () => addLike(objNote.id));

  liElemnt.querySelector(`#dislike-${objNote.id}`)
    .addEventListener('click', () => deleteLikePost(objNote.id));

  showLikePost(objNote.id);
  return liElemnt;
};

export const home = (notes) => {
  const homeDiv = document.createElement('div');

  const homeContent = `
  <header>
    <h2>tasty recipes</h2> 
    <nav>
      <ul class="nav-links">
        <li><a id="user-name">User</a></li>
        <li><a href="#/about">about</a></li>
        <li><a id="signOut">Cerrar Sesión</a></li>
      </ul>
    </nav>    
  </header>
  <main>
      <h1>Responsive Header</h1>
      <!--<div id="profile"></div>-->
      <div id="user-perfil"></div>
      <form id="form-publication" maxlength=50 class="flex-form" required>
        <textarea placeholder="¿Que quieres compartir?" id="publication"></textarea>
        <select id="privacidad" name="select">
        <option value="publico" selected>Publico</option> 
        <option value="privado">Privado</option>
      </select>
        <input type="submit" id="compartir-post" class="button-login" value="Compartir">
        <input type="submit" id="edit-post" class="button-login hide" value="Editar">
        <input type="submit" id="mis-post" class="button-login " value="Mis Post">
      </form> 
    <section>
      <ul id="notes-list">
      </ul>
    </section>
  </main>
  <footer></footer>
    `;
  homeDiv.innerHTML = homeContent;

  const ul = homeDiv.querySelector('#notes-list');
  notes.forEach((note) => {
    ul.appendChild(listNotes(note));
  });

  const userName = homeDiv.querySelector('#user-name');

  const btnSignOut = homeDiv.querySelector('#signOut');
  const btnComportirPost = homeDiv.querySelector('#compartir-post');
  const btnMisPost = homeDiv.querySelector('#mis-post');
  btnMisPost.addEventListener('click', () => {
    ul.innerHTML = '';
    showPostUserFirebase((notes) => {
      notes.forEach((notes) => {
        ul.appendChild(listNotes(notes));
      });
    });
  });
  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  userName.addEventListener('click', changeViewToProfile);

  btnComportirPost.addEventListener('click', savePost);

  return homeDiv;
};
