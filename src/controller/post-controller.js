import { dataBase } from '../main.js';
import { userCurrent } from '../controller/login-controller.js';
export const savePost = () => {
  const notePost = document.querySelector('#publication').value;
  const user = userCurrent();
  dataBase.collection("post").add({
    notes: notePost,
    user: user.uid,
    userName: user.displayName
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

export const showPost = (tabla) => {
  // const table = document.getElementById('tabla');
  dataBase.collection("post").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().userName}`);
      tabla.innerHTML += `
      <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().userName}</td>
          <td>${doc.data().notes}</td>
          <td><button id="${doc.id}" class="btn btn-warning">Editar</button></td>
          <td><button id="${doc.id}" name="delete" class="btn-delete">Eliminar</button></td>
        </tr>
        `
    });
    const buttonDeletePost = document.querySelector('#listOfPublications'); 
  buttonDeletePost.addEventListener('click', deletePost);
  });

}

export const deletePost = (event) => {
  alert('entraste');
  event.preventDefault();
  const id = event.target.id;
  dataBase.collection("post").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}



