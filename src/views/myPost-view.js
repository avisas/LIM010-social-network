/* eslint-disable import/no-cycle */
import { listNotes } from './post-view.js';

export const myPost = (myNotes) => {
  const myPostDiv = document.createElement('div');
  myPostDiv.innerHTML = `
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
      <ul id="myPostNotes-list" class="ul-parent">
      </ul>
    </section>
    `;

  const ulMyPost = myPostDiv.querySelector('#myPostNotes-list');
  myNotes.forEach((note3) => {
    ulMyPost.appendChild(listNotes(note3));
  });

  return myPostDiv;
};
