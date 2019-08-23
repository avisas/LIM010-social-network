/* eslint-disable import/no-cycle */
// eslint-disable-next-line object-curly-newline
import { deletePost, edit, addLike, deleteLikePost, showLikePost, saveComment, editComment } from '../controller/post-controller.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

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

  showLikePost(liElemntMyPost, objMyPostNote.id);
  return liElemntMyPost;
};

export const myPost = (myNotes) => {
  const myPostDiv = document.createElement('div');
  const myPostContent = `
    <section>
      <ul id="myPostNotes-list">
      </ul>
    </section>
    `;
  myPostDiv.innerHTML = myPostContent;

  const ulMyPost = myPostDiv.querySelector('#myPostNotes-list');
  myNotes.forEach((note3) => {
    ulMyPost.appendChild(myPostListNotes(note3));
  });


  return myPostDiv;
};
