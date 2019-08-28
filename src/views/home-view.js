/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
// eslint-disable-next-line object-curly-newline
import { savePost } from '../controller/post-controller.js';
import { listNotes } from './post-view.js';

export const home = (notes) => {
  const homeDiv = document.createElement('div');
  homeDiv.innerHTML = `
        <div id="form-save" class="div-post">
          <form id="form-publication" class="padding" maxlength=50 required>
            <textarea placeholder="¿Que quieres compartir?" id="publication" class="textarea-post"></textarea>
            <div class="flex-bottom-form">
              <select id="privacidad" class="btn-select" name="select">
                <option value="publico" selected>Público</option> 
                <option value="privado">Privado</option>
              </select>
              <span class="circle-img" id="image"><i class="fa fa-picture-o" aria-hidden="true"></i></span>
              <input type="file" class="hide" value="upload" id="fileButton"/>
              <input type="submit" id="compartir-post" class="btn-share" value="Compartir">
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

  btnComportirPost.addEventListener('click', savePost);

  const fileButton = homeDiv.querySelector('#fileButton');
  const btnImg = homeDiv.querySelector('#image');
  btnImg.addEventListener('click', () => {
    fileButton.classList.remove('hide');
    btnImg.classList.add('hide');
  });


  return homeDiv;
};
