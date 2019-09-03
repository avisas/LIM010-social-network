// eslint-disable-next-line import/no-cycle
import { listNotes } from './post-view.js';

export const myPost = (myNotes) => {
  const myPostDiv = document.createElement('div');
  myPostDiv.innerHTML = `
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
