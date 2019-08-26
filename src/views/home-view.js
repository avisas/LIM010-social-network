/* eslint-disable import/no-cycle */
// eslint-disable-next-line object-curly-newline
import { savePost } from '../controller/post-controller.js';
import { listNotes } from './post-view.js';

export const home = (notes) => {
  const homeDiv = document.createElement('div');
  homeDiv.innerHTML = `
        <div id="form-save" class="div-post">
          <form id="form-publication" maxlength=50 required>
            <textarea placeholder="¿Que quieres compartir?" id="publication" class="textarea-post"></textarea>
            <select id="privacidad" class="btn-select" name="select">
              <option value="publico" selected>Público</option> 
              <option value="privado">Privado</option>
            </select>
            <input type="submit" id="compartir-post" class="btn-share" value="Compartir">
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
  return homeDiv;
};
