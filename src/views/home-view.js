/* eslint-disable import/no-cycle */
<<<<<<< HEAD
import { savePost } from '../controller/post-controller.js';
import { listNotes } from './post-view.js';
=======
import { storage } from '../main.js';
import { recoverUserName, changeViewToProfile, changeViewToMyPosts, signOutUser } from '../controller/home-controller.js';
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
      <a class="mr-mitad" id="delete-${objNote.id}">
        <i>Delete</i>
      </a>
      <a class="hide mr-mitad" id="savecomment-${objNote.id}">
        <i>Guardar</i>
      </a>
      <a class="mr-mitad" id="edit-${objNote.id}">
        <i>Edit</i>
      </a> ` : `
      <a class="hide mr-mitad" id="delete-${objNote.id}">
        <i>Delete</i>
      </a>
      <a class="hide mr-mitad" id="savecomment-${objNote.id}">
        <i>Guardar</i>
      </a>
      <a class="hide mr-mitad" id="edit-${objNote.id}">
        <i>Edit</i>
      </a> 
    `}
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
  <div class="div-post">
    <div>
      <span>${objNote.userName}</span>
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
    ${userCurrent().uid === objNote.user ? `<a class="mr-mitad" id="delete-${objNote.id}"> <i>Delete</i>
      </a>
      </span>
      <a class="mr-mitad" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}">
      <i>Edit</i>
      </a>
      <a class="mr-mitad hide" id="save-post-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}">
      <i>Guardar</i>
      </a>
      ` : `<a class="hide mr-mitad" id="delete-${objNote.id}">
      <i>Delete</i>
      </a>
      </span>
      <a class="hide mr-mitad" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}">
      <i>Edit</i>
      </a> 
      <a class="mr-mitad hide" id="save-post-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}">
      <i>Guardar</i>
      </a>`}
      
      <a class="mr-mitad" id="like-${objNote.id}" data-post="${objNote.id}">
      <img class="heart" src="../src/img/corazon-vacio.png">
      </a>
      <a class="hide mr-mitad" id="dislike-${objNote.id}" data-post="${objNote.id}">
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
>>>>>>> 3c233a72927f7ab35848f80d7a100971e8d813a5

export const home = (notes) => {
  const homeDiv = document.createElement('div');
  homeDiv.innerHTML = `
  <div id="form-save" class="div-post">
    <form id="form-publication" class="padding" maxlength=50 required>
        <textarea placeholder="¿Que quieres compartir?" id="publication" class="textarea-post"></textarea>
        <div class="flex-bottom-form">
            <div>
                <label for="fileButton" id="image"><i class="fa fa-picture-o btn-picture"
                        aria-hidden="true"></i></label>
                <input type="text" class="file-name" id="inputval" />
                <input type="file" class="hide" name="file" value="upload" id="fileButton" />
            </div>
            <select id="privacidad" class="btn-select" name="select">
                <option value="publico" selected>Público</option>
                <option value="privado">Privado</option>
            </select>
<<<<<<< HEAD
            <input type="button" id="compartir-post" class="btn-share" value="Compartir">
=======
            <input type="file" value="upload" id="file-button">
            <input type="submit" id="compartir-post" class="btn-share" value="Compartir">
          </form> 
>>>>>>> 3c233a72927f7ab35848f80d7a100971e8d813a5
        </div>
    </form>
  </div>
  <section>
    <ul id="notes-list" class="ul-parent">
    </ul>
  </section>
    `;
  const ul = homeDiv.querySelector('#notes-list');
  notes.forEach((note) => {
    ul.appendChild(listNotes(note));
  });
  const btnComportirPost = homeDiv.querySelector('#compartir-post');
<<<<<<< HEAD
  const nameValue = homeDiv.querySelector('#inputval');
=======
  const fileButton = homeDiv.querySelector('#file-button');

  // const btnMisPost = homeDiv.querySelector('#mis-post');
  userName.addEventListener('click', changeViewToMyPosts);

  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  settingUser.addEventListener('click', changeViewToProfile);
>>>>>>> 3c233a72927f7ab35848f80d7a100971e8d813a5

  btnComportirPost.addEventListener('click', savePost);

  const fileButton = homeDiv.querySelector('#fileButton');
  fileButton.addEventListener('change', () => {
    const fileValue = fileButton.files[0].name;
    nameValue.value = fileValue;
  });

  fileButton.addEventListener('change', (event) => {
    console.log('Esto es el storage');
    console.log(storage);
    const file = event.target.files[0];
    const storageRef = storage.ref('images/' + file.name);
    storageRef.put(file);
    console.log('Aqui llegó al storageRef');
  });

  return homeDiv;
};
