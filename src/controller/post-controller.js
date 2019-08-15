import { userCurrent } from '../controller-firebase/controller-authentication.js';
// eslint-disable-next-line import/no-cycle
import { dataBase } from '../main.js';


export const savePost = (event) => {
  event.preventDefault();
  const notePost = document.querySelector('#publication').value;
  const time = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
  const user = userCurrent();
  dataBase.collection('post').add({
    notes: notePost,
    user: user.uid,
    userName: user.displayName,
    timePost: time,
  })
    .then(() => {
      // alert('Publicacion ingresada');
      // console.log('Document written with ID: ', docRef.id);
    }).catch(() => {
      // console.error('Error adding document: ', error);
    });
};

const deletePost = (event) => {
  event.preventDefault();
  const id = event.target.id;
  dataBase.collection('post').doc(id).delete().then(() => {
    // console.log('Document successfully deleted!'); poner un modal
  })
    .catch(() => {
      // console.error('Error removing document: ', error); poner un modal
    });
};

const edit = (event) => {
  event.preventDefault();
  const id = event.target.id;
  const notes = event.currentTarget.dataset.note;
  document.querySelector('#publication').value = notes;
  const boton = document.querySelector('#edit-post');
  const botonGuardar = document.querySelector('#compartir-post');
  boton.classList.remove('hide');
  botonGuardar.classList.add('hide');
  boton.value = 'Editar';
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    const washingtonRef = dataBase.collection('post').doc(id);

    // Set the "capital" field of the city 'DC'
    const note = document.querySelector('#publication').value;
    const time = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
    return washingtonRef.update({
      notes: note,
      timePost: time,
    })
      .then(() => {
        boton.classList.add('hide');
        botonGuardar.classList.remove('hide');
      })
      .catch(() => {
        // The document probably doesn't exist.
        // console.error('Error updating document: ', error);
      });
  });
};

export const showPost = (tabla) => {
  dataBase.collection('post').onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().userName}`);
      tabla.innerHTML += `
      <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().userName}</td>
          <td>${doc.data().notes}</td>
          <td>${doc.data().timePost}</td>
          <td><button id="${doc.id}" name="edit" data-note="${doc.data().notes}" class="edit">Editar</button></td>
          <td><button id="${doc.id}" name="delete" class="delete">Eliminar</button></td>
        </tr>
        `;
    });
    const buttonDeletePost = document.querySelectorAll('.delete');
    // eslint-disable-next-line no-restricted-syntax
    for (const button of buttonDeletePost) {
      button.addEventListener('click', deletePost);
    }

    const buttons = document.querySelectorAll('.edit');

    // eslint-disable-next-line no-restricted-syntax
    for (const button of buttons) {
      button.addEventListener('click', edit);
    }
  });
};
