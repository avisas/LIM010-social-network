/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
// eslint-disable-next-line object-curly-newline
import { savePost, deletePost, edit, addLike, deleteLikePost, showLikePost, saveComment, editComment } from '../controller/post-controller.js';
import { getAllComments, deleteCommentFirebase } from '../controller-firebase/controller-likes.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

const listComment = (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
  <span class="">
    <span>${objNote.nameUser}</span>
    <textarea disabled id="textcomment-${objNote.id}">${objNote.comment}</textarea>
  </span>
  ${userCurrent().uid === objNote.idUser ? `
  <a class="" id="delete-${objNote.id}">
  <i>Delete</i>
  </a>
  <a class="hide" id="savecomment-${objNote.id}">
  <i>Guardar</i>
  </a>
  <a class="" id="edit-${objNote.id}">
  <i>Edit</i>
  </a> ` : `<a class="hide" id="delete-${objNote.id}">
  <i>Delete</i>
  </a>
  <a class="hide" id="savecomment-${objNote.id}">
  <i>Guardar</i>
  </a>
  <a class="hide" id="edit-${objNote.id}">
  <i>Edit</i>
  </a> `}
  `;

  liElemnt.querySelector(`#delete-${objNote.id}`)
    .addEventListener('click', () => deleteCommentFirebase(objNote.idPost, objNote.id));

  liElemnt.querySelector(`#edit-${objNote.id}`)
    .addEventListener('click', () => editComment(objNote.id, objNote.idPost));

  return liElemnt;
};

const listNotes = (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
  <div class="div-posts">
    <div>
      <span>${objNote.userName}</span>
      <span>${objNote.privacidad}</span>
    </div>
    <hr/>
    <div class="middle-post">
      <textarea id="text-${objNote.id}" disabled>${objNote.notes}</textarea>
      <hr/>
      <select id="selectPriv-${objNote.id}" class="btn-privacidad" name="select" disabled>
      ${objNote.privacidad === 'privado' ? `<option value="privado" selected>Privado</option>  
        <option value="publico">Público</option>` : `<option value="privado">Privado</option>  
        <option value="publico" selected>Público</option> `}
      </select>
      <hr/>
      <span>${objNote.timePost}</span>
    </div>
    <div class="botom-post">
    ${userCurrent().uid === objNote.user ? `<a class="" id="delete-${objNote.id}"> <i>Delete</i>
      </a>
      </span>
      <a class="" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}">
      <i>Edit</i>
      </a>` : `<a class="hide" id="delete-${objNote.id}">
      <i>Delete</i>
      </a>
      </span>
      <a class="hide" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}">
      <i>Edit</i>
      </a> `}
      
      <a class="" id="like-${objNote.id}" data-post="${objNote.id}">
      <img class="heart" src="../src/img/corazon-vacio.png">
      </a>
      <a class="hide" id="dislike-${objNote.id}" data-post="${objNote.id}">
      <img class="heart" src="../src/img/corazon.png">
      </a>
      <a id="counter-${objNote.id}">
      </a>
    </div>
    
    <form id="form-publication" maxlength=50 class="flex-form" required>
      <textarea placeholder="¿Que quieres compartir?" id="commentario-${objNote.id}"></textarea>
      <input type="submit" id="comment-${objNote.id}" data-post="${objNote.id}" class="button-home" value="Comentar">
    </form> 
    <section id="allComments-${objNote.id}"></section>
  </div>
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
    <nav class="nav-links flex menu-bar">
    <a  id="hamb-menu" class="bt-menu"><span class="icon-menu"></span></a>
    <ul id="show-hamb" class="hide list-menu">
        <li><a id="user-name"><span class="icon-user"></span>User</a></li>
        <li><a id="home">Home</a></li>
        <li><a href="#/about"><span class="icon-question"></span>About</a></li>
     <li><a id="signOut"><span class="icon-exit"></span>Cerrar Sesión</a></li>
    </ul>
  </nav>     
  </header>
  <main>
  <div id="user-perfil">
  <img class="img-profile" src="img/banner03.jpg">
  <div>
    ${userCurrent().photoURL !== null ? `<img src="${userCurrent().photoURL}">` : '<img src="">'}
    <h2>
    </div>
    </div>
  <div>
      <div class="div-post">
      <form id="form-publication" maxlength=50 class="flex-post" required>
        <textarea placeholder="¿Que quieres compartir?" id="publication" class="textarea-post"></textarea>
        <select id="privacidad" class="btn-select" name="select">
        <option value="publico" selected>Público</option> 
        <option value="privado">Privado</option>
      </select>
        <input type="submit" id="compartir-post" class="btn-share" value="Compartir">
        <input type="submit" id="edit-post" class="btn-edit hide" value="Editar">
        <button id="mis-post" class="button-home">Mis Post</button>
      </form> 
      </div>
    <section>
      <ul id="notes-list" class="ul-parent">
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
  const settingUser = homeDiv.querySelector('#setting');
  const btnComportirPost = homeDiv.querySelector('#compartir-post');

  // const btnMisPost = homeDiv.querySelector('#mis-post');
  userName.addEventListener('click', (ev) => {
    ev.preventDefault();
    window.location.hash = '#/myPost';
  });

  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  settingUser.addEventListener('click', changeViewToProfile);

  btnComportirPost.addEventListener('click', savePost);

  const HambMenu = homeDiv.querySelector('#hamb-menu');
  const showHamb = homeDiv.querySelector('#show-hamb');
  let modoMenu = 0;

  HambMenu.addEventListener('click', () => {
    if (modoMenu === 0) {
      showHamb.classList.add('block');
      showHamb.classList.remove('hide');
      modoMenu = 1;
    } else {
      showHamb.classList.add('hide');
      showHamb.classList.remove('block');
      modoMenu = 0;
    }
  });

  return homeDiv;
};


