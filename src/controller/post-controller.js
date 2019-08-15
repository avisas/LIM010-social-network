import { dataBase } from '../main.js';
import { userCurrent } from './login-controller.js';

export const savePost = (event) => {
  event.preventDefault();
  const notePost = document.querySelector('#publication').value;
  const user = userCurrent();
  dataBase.collection('post').add({
    notes: notePost,
    user: user.uid,
    userName: user.displayName,
  })
    .then((docRef) => {
      alert('Publicacion ingresada');
      console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
};

const deletePost = (event) => {
  event.preventDefault();
  alert('entraste a eliminar');
   const id = event.target.id;
   dataBase.collection('post').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    }); 
};

export const showPost = (tabla) => {
  // const table = document.getElementById('tabla');
  dataBase.collection('post').onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().userName}`);
      tabla.innerHTML += `
      <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().userName}</td>
          <td>${doc.data().notes}</td>
          <td><button id="" class="btn-edit">Editar</button></td>
          <td><button id="btn-delete" data-id="${doc.id}" class="btn-delete">Eliminar</button></td>
        </tr>
        `;
    });
    const buttonDeletePost = document.querySelector('#listOfPublications .btn-delete').getAttribute('#btn-delete');

    buttonDeletePost.addEventListener('click', deletePost());
  });
};
