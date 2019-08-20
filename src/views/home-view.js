/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
// eslint-disable-next-line object-curly-newline
import { savePost, deletePost, edit, addLike, deleteLikePost, showLikePost, saveComment, editComment } from '../controller/post-controller.js';
import { getAllComments, deleteCommentFirebase } from '../controller-firebase/controller-likes.js';
import { showPostUserFirebase } from '../controller-firebase/controller-post.js';

const listComment = (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
  <span class="">
    <span>${objNote.nameUser}</span>
    <span>${objNote.comment}</span>
  </span>
  <a class="" id="delete-${objNote.id}">
  <i>Delete</i>
  </a>
  </span>
  <a class="" id="edit-${objNote.id}">
  <i>Edit</i>
  </a> 
  `;

  liElemnt.querySelector(`#delete-${objNote.id}`)
    .addEventListener('click', () => deleteCommentFirebase(objNote.idPost, objNote.id));

  liElemnt.querySelector(`#edit-${objNote.id}`)
    .addEventListener('click', () => editComment(objNote.id, objNote.idPost, objNote.comment));

  return liElemnt;
};

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
  <img class="heart" src="../src/img/corazon-vacio.png">
  </a>
  <a class="hide" id="dislike-${objNote.id}" data-post="${objNote.id}">
  <img class="heart" src="../src/img/corazon.png">
  </a>
  <a id="counter-${objNote.id}">
  </a>
  <form id="form-publication" maxlength=50 class="flex-form" required>
    <textarea placeholder="¿Que quieres compartir?" id="commentario-${objNote.id}"></textarea>
    <input type="submit" id="comment-${objNote.id}" data-post="${objNote.id}" class="button-home" value="Comentar">
    <input type="submit" id="editco-${objNote.id}" class="button-home hide" value="Editar">
  </form> 
  <section id="allComments-${objNote.id}"></section>
  `;
  liElemnt.querySelector(`#delete-${objNote.id}`)
    .addEventListener('click', () => deletePost(objNote.id));

  liElemnt.querySelector(`#edit-${objNote.id}`)
    .addEventListener('click', () => edit(objNote.id));

  liElemnt.querySelector(`#like-${objNote.id}`)
    .addEventListener('click', () => addLike(objNote.id));

  liElemnt.querySelector(`#dislike-${objNote.id}`)
    .addEventListener('click', () => deleteLikePost(objNote.id));
  // changeButton(liElemnt, objNote.id);
  liElemnt.querySelector(`#comment-${objNote.id}`)
    .addEventListener('click', () => saveComment(objNote.id));

  showLikePost(liElemnt, objNote.id);

  const allComents = liElemnt.querySelector(`#allComments-${objNote.id}`);

  getAllComments(objNote.id, (coments) => {
    allComents.innerHTML = '';
    coments.forEach((comment) => {
      allComents.appendChild(listComment(comment));
    });
  });
  return liElemnt;
};

export const home = (notes) => {
  const homeDiv = document.createElement('div');

  const homeContent = `
  <header>
    <h2>Meet and Code</h2> 
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
        <input type="submit" id="compartir-post" class="button-home" value="Compartir">
        <input type="submit" id="edit-post" class="button-home hide" value="Editar">
        <button id="mis-post" class="button-home">Mis Post</button>
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
  // const allPublications = homeDiv.querySelector('#listOfPublications');
  // const selectPrivacidad = homeDiv.querySelector('#privacidad');

  const btnSignOut = homeDiv.querySelector('#signOut');
  // const notePost = home.querySelector('#publication').value;
  const btnComportirPost = homeDiv.querySelector('#compartir-post');

  const btnMisPost = homeDiv.querySelector('#mis-post');
  btnMisPost.addEventListener('click', (ev) => {
    ev.preventDefault();
    ul.innerHTML = '';
    showPostUserFirebase((notes) => {
      notes.forEach((note) => {
        ul.appendChild(listNotes(note));
      });
    });
  });


  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  userName.addEventListener('click', changeViewToProfile);

  btnComportirPost.addEventListener('click', savePost);
  // showPost(allPublications);
  // showPostCurrenUser(allPublications);

  return homeDiv;
};