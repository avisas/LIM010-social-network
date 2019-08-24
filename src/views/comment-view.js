/* eslint-disable import/no-cycle */
import { editComment } from '../controller/post-controller.js';
import { deleteCommentFirebase } from '../controller-firebase/controller-likes.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

export const listComment = (objNote) => {
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
