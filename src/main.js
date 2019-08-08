import { registerTemplate } from './views/register-view.js';

const loginGoogle = document.getElementById("google");
const loginFacebook = document.getElementById("facebook");
const formAutenticacion = document.getElementById("form-autenticacion");

const signIn = (event) => {
  event.preventDefault();
  const messageErrorLabel = document.getElementById("messageError");
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;
  firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
    .then((result) => {
      messageErrorLabel.classList.remove("show-message-error");
      messageErrorLabel.innerHTML = '';
      console.log(result);
      alert('Ingresaste')
    })
    .catch((error) => {
      messageErrorLabel.classList.add("show-message-error");
      switch (error.code) {
        case 'auth/user-not-found':
          messageErrorLabel.innerHTML = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          messageErrorLabel.innerHTML = 'Contraseña incorrecta';
          break;
        default:
          messageErrorLabel.innerHTML = 'Se ha producido un error';
          console.log(`code: "${error.code}" & message: ${error.message}`);
      }
    });
}

formAutenticacion = document.getElementById("form-autenticacion");
formAutenticacion.addEventListener("submit", signIn);

const register = document.getElementById("register");
register.addEventListener('click', () => {
  registerTemplate();
  /*const formRegister = document.createElement('div');
  const divContent = `<form id="form-register" class="flex-form">
  <h1>Social Network</h1>
  <input type="text" name="mail" placeholder="Email" class="inputForm" id="mail">
  <input type="password" name="pass" placeholder="Password" class="inputForm" id="pass">
  <input type="submit" class="button" id="button-register" value="Register">
  </form>
  `;
  formRegister.innerHTML = divContent;
  document.getElementById("page2").appendChild(formRegister); 
  const btnRegister = formRegister.querySelector('#button-register');
  btnRegister.addEventListener('click', registerFunction);*/
});
/*
const registerFunction = (event) => {
  event.preventDefault();
  const email = document.querySelector('#mail').value;
  const password = document.querySelector('#pass').value;
  console.log(email);
  console.log(password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (result) {
      alert('Creadooo');
    })
    .catch(error => {
      alert( 'Error');
    });
}
*/

const signInFacebook = (event) => {
  event.preventDefault();
  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    console.log(result);
  }).catch(function (error) {
    console.log(error);
  })
};

loginFacebook.addEventListener("click", signInFacebook);

const signInGoogle = (event) => {
  event.preventDefault();
   if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      let token = result.credential.accessToken;
      let user = result.user;
    }).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Es el mismo usuario');
      }
    });
  } else {
    firebase.auth().signOut();
  } 
 
};

loginGoogle.addEventListener("click", signInGoogle,false);