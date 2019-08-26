/* eslint-disable import/no-cycle */
import {
  deletePost, edit, addLike, deleteLikePost, showLikePost, saveComment,
} from '../controller/post-controller.js';
import { getAllComments } from '../controller-firebase/controller-likes.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import { listComment } from './comment-view.js';

export const listNotes = (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
      <div class="div-post">
        <div>
          <span>${objNote.userName}</span>
        </div>
        <hr>
        <div class="middle-post">
          <textarea id="text-${objNote.id}" disabled>${objNote.notes}</textarea>
          <select id="selectPriv-${objNote.id}" class="btn-privacidad" name="select" disabled>
          ${objNote.privacidad === 'privado' ? `<option value="privado" selected>Privado</option>  
            <option value="publico">Público</option>` : `<option value="privado">Privado</option>  
            <option value="publico" selected>Público</option> `}
          </select>
          <hr>
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
