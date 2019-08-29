/* eslint-disable import/no-cycle */
import { editComment } from '../controller/post-controller.js';
import { deleteCommentFirebase } from '../controller-firebase/controller-likes.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

export const listComment = (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.classList.add('div-comment');
  liElemnt.classList.add('margin');
  liElemnt.innerHTML = `
    <div class="user-publicated padding flex-name-post">
        <span>Comentado por: ${objNote.nameUser}</span>
        ${userCurrent().uid === objNote.idUser ? `
        <span class="hide" id="savecomment-${objNote.id}"><i class="fa fa-floppy-o" aria-hidden="true"></i></span>
        <span id="edit-${objNote.id}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
        <span class="" id="delete-${objNote.id}"><i class="fa fa-trash" aria-hidden="true"></i></span>
         ` : `
         <span class="hide" id="savecomment-${objNote.id}"><i class="fa fa-floppy-o" aria-hidden="true"></i></span>
         <span class="hide" id="edit-${objNote.id}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
         <span class="hide" id="delete-${objNote.id}"><i class="fa fa-trash" aria-hidden="true"></i></span>
          `}
    </div>
    <textarea class="textarea padding margin" disabled id="textcomment-${objNote.id}">${objNote.comment}</textarea>
    `;

  liElemnt.querySelector(`#delete-${objNote.id}`)
    .addEventListener('click', () => deleteCommentFirebase(objNote.idPost, objNote.id));

  liElemnt.querySelector(`#edit-${objNote.id}`)
    .addEventListener('click', () => editComment(objNote.id, objNote.idPost));
  return liElemnt;
};
