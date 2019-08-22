/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
// eslint-disable-next-line object-curly-newline
import { deletePost, edit, addLike, deleteLikePost, showLikePost, saveComment, editComment } from '../controller/post-controller.js';
import { getAllComments, deleteCommentFirebase } from '../controller-firebase/controller-likes.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

const listComment = (objMyPostNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
  <span class="">
    <span>${objMyPostNote.nameUser}</span>
    <span>${objMyPostNote.comment}</span>
  </span>
  <a class="" id="delete-${objMyPostNote.id}">
  <i>Delete</i>
  </a>
  </span>
  <a class="" id="edit-${objMyPostNote.id}">
  <i>Edit</i>
  </a> 
  `;

  liElemnt.querySelector(`#delete-${objMyPostNote.id}`)
    .addEventListener('click', () => deleteCommentFirebase(objMyPostNote.idPost, objMyPostNote.id));

  liElemnt.querySelector(`#edit-${objMyPostNote.id}`)
    .addEventListener('click', () => editComment(objMyPostNote.id, objMyPostNote.idPost, objMyPostNote.comment));

  return liElemnt;
};

const myPostListNotes = (objMyPostNote) => {
  const liElemntMyPost = document.createElement('li');
  liElemntMyPost.classList.add('li-child');
  liElemntMyPost.innerHTML = `
  <div class="div-posts">
    <div>
      <span>${objMyPostNote.userName}</span>
      <span>${objMyPostNote.privacidad}</span>
    </div>
    <hr/>
    <div class="middle-post">
      <textarea id="text-${objMyPostNote.id}" disabled>${objMyPostNote.notes}</textarea>
      <hr/>
      <select id="selectPriv-${objMyPostNote.id}" class="btn-privacidad" name="select" disabled>
      ${objMyPostNote.privacidad === 'privado' ? `<option value="privado" selected>Privado</option>  
        <option value="publico">Público</option>` : `<option value="privado">Privado</option>  
        <option value="publico" selected>Público</option> `}
      </select>
      <hr/>
      <span>${objMyPostNote.timePost}</span>
    </div>
    <div class="botom-post">
    ${userCurrent().uid === objMyPostNote.user ? `<a class="" id="delete-${objMyPostNote.id}"> <i>Delete</i>
      </a>
      </span>
      <a class="" id="edit-${objMyPostNote.id}" data-note="${objMyPostNote.notes}" data-privacidad="${objMyPostNote.privacidad}">
      <i>Edit</i>
      </a>` : `<a class="hide" id="delete-${objMyPostNote.id}">
      <i>Delete</i>
      </a>
      </span>
      <a class="hide" id="edit-${objMyPostNote.id}" data-note="${objMyPostNote.notes}" data-privacidad="${objMyPostNote.privacidad}">
      <i>Edit</i>
      </a> `}
      <a class="" id="like-${objMyPostNote.id}" data-post="${objMyPostNote.id}">
      <img class="heart" src="../src/img/corazon-vacio.png">
      </a>
      <a class="hide" id="dislike-${objMyPostNote.id}" data-post="${objMyPostNote.id}">
      <img class="heart" src="../src/img/corazon.png">
      </a>
      <a id="counter-${objMyPostNote.id}">
      </a>
    </div>
    
    <form id="form-publication" maxlength=50 class="flex-form" required>
      <textarea placeholder="¿Que quieres compartir?" id="commentario-${objMyPostNote.id}"></textarea>
      <input type="submit" id="comment-${objMyPostNote.id}" data-post="${objMyPostNote.id}" class="button-home" value="Comentar">
      <input type="submit" id="editco-${objMyPostNote.id}" class="button-home hide" value="Editar">
    </form> 
    <section id="allComments-${objMyPostNote.id}"></section>
  </div>
  `;
  liElemntMyPost.querySelector(`#delete-${objMyPostNote.id}`)
    .addEventListener('click', () => deletePost(objMyPostNote.id));

  liElemntMyPost.querySelector(`#edit-${objMyPostNote.id}`)
    .addEventListener('click', () => edit(objMyPostNote.id));

  liElemntMyPost.querySelector(`#like-${objMyPostNote.id}`)
    .addEventListener('click', () => addLike(objMyPostNote.id));

  liElemntMyPost.querySelector(`#dislike-${objMyPostNote.id}`)
    .addEventListener('click', () => deleteLikePost(objMyPostNote.id));
  // changeButton(liElemnt, objNote.id);
  liElemntMyPost.querySelector(`#comment-${objMyPostNote.id}`)
    .addEventListener('click', () => saveComment(objMyPostNote.id));

  showLikePost(liElemntMyPost, objMyPostNote.id);

  const allComents = liElemntMyPost.querySelector(`#allComments-${objMyPostNote.id}`);

  getAllComments(objMyPostNote.id, (coments) => {
    allComents.innerHTML = '';
    coments.forEach((comment) => {
      allComents.appendChild(listComment(comment));
    });
  });
  return liElemntMyPost;
};

export const myPost = (myNotes) => {
  const myPostDiv = document.createElement('div');
  const myPostContent = `
  <header>
    <h2>Meet and Code</h2> 
    <nav>
      <ul class="nav-links">
        <li><a id="user-name">User</a></li>
        <li><a id="home">Home</a></li>
        <li><a id=""">About</a></li>
        <li><a id="setting">Setting</a></li>
        <li><a id="signOut">Log Out</a></li>
      </ul>
    </nav>    
  </header>
  <main>
    <div id="user-perfil">
    <img class="img-profile" src="img/banner03.jpg">
    <div>
      ${userCurrent().photoURL !== null ? `<img src="${userCurrent().photoURL}">` : `<img src="">`}
      <h2>
    </div>
    </div>
    <div>
      
    <section>
      <ul id="myPostNotes-list">
      </ul>
    </section>
  </main>
  <footer></footer>
    `;
  myPostDiv.innerHTML = myPostContent;

  const ulMyPost = myPostDiv.querySelector('#myPostNotes-list');
  myNotes.forEach((note3) => {
    ulMyPost.appendChild(myPostListNotes(note3));
  });

  const userName = myPostDiv.querySelector('#user-name');
  const btnSignOut = myPostDiv.querySelector('#signOut');
  const settingUser = myPostDiv.querySelector('#setting');
  const btnHome = myPostDiv.querySelector('#home');
  // const btnComportirPost = homeDiv.querySelector('#compartir-post');

  // const btnMisPost = homeDiv.querySelector('#mis-post');
  userName.addEventListener('click', (ev) => {
    ev.preventDefault();
    window.location.hash = '#/myPost';
  });

  btnHome.addEventListener('click', (ev) => {
    ev.preventDefault();
    window.location.hash = '#/home';
  });

  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  settingUser.addEventListener('click', changeViewToProfile);

  // btnComportirPost.addEventListener('click', savePost);

  return myPostDiv;
};
