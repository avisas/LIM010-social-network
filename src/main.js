//import  {myFunction } from './lib/index.js';
const loginGoogle = document.getElementById("google");
const loginFacebook = document.getElementById("facebook");
const formAutenticacion = document.getElementById("form-autenticacion");
let email = document.getElementById("email");

// Login de usuario
const signIn = (event) => {
  event.preventDefault();
  const messageErrorLabel = document.getElementById("messageError");
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;
  firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
    .then(function (result) {
      messageErrorLabel.classList.remove("show-message-error");
      messageErrorLabel.innerHTML = '';
      alert('Ingresaste')
    })
    .catch(function (error) {
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

formAutenticacion.addEventListener("submit", signIn);


// Crear usuario
const userCreate = (event) => {
  event.preventDefault();
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;

  firebase.auth().createUserWithEmailAndPassword(usuario, contrasena)
    .then(function (result) {
      alert('Usuario creado');
    })
    .catch(function (error) {
      alert('Error');
    });
}


email.addEventListener("keyup", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Ingresa un correo electrónico válido!");
  } else {
    email.setCustomValidity("");
  };
});

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

loginGoogle.addEventListener("click", signInGoogle, false);