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
        <div class="user-publicated padding flex-name-post">
          <span>Publicado por: ${objNote.userName}</span>
          ${userCurrent().uid === objNote.user ? `<span><i class="fa fa-trash btn-delete" id="delete-${objNote.id}" aria-hidden="true"></i><span>` :
          `<span class="hide"><i class="fa fa-trash" id="delete-${objNote.id}" aria-hidden="true"></i></span>`}
        </div>
        <div class="middle-post">
          <textarea class="textarea margin padding" id="text-${objNote.id}" disabled>${objNote.notes}</textarea>
          ${objNote.img !== '' ? `<img class="img-post" src="${objNote.img}">` : ``}
          <div>
          <select id="selectPriv-${objNote.id}" class="btn-privacidad margin" name="select" disabled>
          ${objNote.privacidad === 'privado' ? `<option value="privado" selected>Privado</option>  
            <option value="publico">Público</option>` : `<option value="privado">Privado</option>  
            <option value="publico" selected>Público</option> `}
          </select>
          <span class="margin">${objNote.timePost}</span>
          </div>
        </div>
        <div class="botom-post padding list-item">
          <i class="fa fa-heart-o heart-empty" aria-hidden="true" id="like-${objNote.id}" data-post="${objNote.id}"></i>
          <i class="fa fa-heart hide heart-full" aria-hidden="true" id="dislike-${objNote.id}" data-post="${objNote.id}"></i>
          <a id="counter-${objNote.id}"></a>
          ${userCurrent().uid === objNote.user ? `
            <span class="margin-left hide" id="save-post-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}"><i class="fa fa-floppy-o iconSave" aria-hidden="true"></i></span>
            <span class="margin-left" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}"><i class="fa fa-pencil-square-o iconEdit" aria-hidden="true"></i><span>
            ` : `
            <span class="margin-left hide" id="save-post-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}"><i class="fa fa-floppy-o iconSave" aria-hidden="true"></i></span>
            <span class="margin-left hide" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}"><i class="fa fa-pencil-square-o iconEdit" aria-hidden="true"></i><span>`}
        </div>
        
        <form id="form-publication" maxlength=50 class="form-comment margin" required>
          <textarea placeholder="Escribe tu comentario" id="commentario-${objNote.id}" class="textarea-comment"></textarea>
          <span id="comment-${objNote.id}" data-post="${objNote.id}"><i class="fa fa-paper-plane btn-comment" aria-hidden="true"></i></span>
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
