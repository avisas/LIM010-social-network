import {
  signIn, signInWithFacebook, signInWithGoogle, signOutLogin, userCurrent,
} from '../controller-firebase/controller-authentication.js';

export const loginFunction = (event) => {
  event.preventDefault();
  const messageErrorLabel = document.getElementById('LoginMessageError');
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;
  signIn(usuario, contrasena)
    .then(() => {
      messageErrorLabel.classList.remove('show-message-error');
      messageErrorLabel.innerHTML = '';
      window.location.hash = '#/codeMeet';
    })
    .catch((error) => {
      messageErrorLabel.classList.add('show-message-error');
      switch (error.code) {
        case 'auth/user-not-found':
          messageErrorLabel.innerHTML = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          messageErrorLabel.innerHTML = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          messageErrorLabel.innerHTML = 'No se ingresó ningún correo electrónico';
          break;
        default:
          messageErrorLabel.innerHTML = 'Se ha producido un error';
      }
    });
};

export const signInFacebook = (event) => {
  event.preventDefault();
  signInWithFacebook().then(() => {
    window.location.hash = '#/codeMeet';
  }).catch(() => {
    // Aqui va el error , leer manejo de errores de FB
  });
};

export const signInGoogle = (event) => {
  event.preventDefault();
  if (!userCurrent()) {
    signInWithGoogle().then(() => {
      window.location.hash = '#/codeMeet';
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        // alert('Es el mismo usuario');
      }
    });
  } else {
    signOutLogin();
  }
};

export const showPassword = () => {
  const tipo = document.querySelector('#password');
  if (tipo.type === 'password') {
    tipo.type = 'text';
  } else {
    tipo.type = 'password';
  }
};
