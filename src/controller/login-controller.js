import {
  signIn, signInWithFacebook, signInWithGoogle, userCurrent,
} from '../controller-firebase/controller-authentication.js';
import { modalMessage } from './home-controller.js';
// eslint-disable-next-line import/no-cycle
import { createProfile } from './register-controller.js';

export const loginFunction = (event) => {
  event.preventDefault();
  const messageErrorLabel = document.getElementById('LoginMessageError');
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;
  signIn(usuario, contrasena)
    .then(() => {
      const modalTitle = '¡Bienvenid@!';
      const modalContent = 'bienvenida';
      modalMessage(modalTitle, modalContent, '#009fc6');
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
  const user = userCurrent();
  let modalTitle;
  let modalContent;
  signInWithFacebook().then(() => {
    createProfile(user.uid, user.displayName, user.email);
    modalTitle = '¡Bienvenid@ ingresaste con Facebook!';
    modalContent = 'bienvenida';
    modalMessage(modalTitle, modalContent, '#009fc6');
    window.location.hash = '#/codeMeet';
  }).catch((error) => {
    const errorType = error.type;
    if (errorType === 'OAuthException') {
      const errorMessage = error.message;
      modalTitle = 'Mensaje de Error';
      modalContent = `Error adding document:${errorMessage}`;
      modalMessage(modalTitle, modalContent, '#009fc6');
    }

    // Aqui va el error , leer manejo de errores de FB
  });
};

export const signInGoogle = (event) => {
  event.preventDefault();
  const user = userCurrent();
  let modalTitle;
  let modalContent;
  signInWithGoogle().then(() => {
    createProfile(user.uid, user.displayName, user.email);
    modalTitle = '¡Bienvenid@ ingresaste con Google!';
    modalContent = 'bienvenida';
    modalMessage(modalTitle, modalContent, '#009fc6');
    window.location.hash = '#/codeMeet';
  }).catch((error) => {
    const errorCode = error.code;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      modalTitle = 'Mensaje de Error';
      modalContent = 'Es el mismo usuario';
      modalMessage(modalTitle, modalContent, '#009fc6');
    }
  });
};

export const showPassword = () => {
  const tipo = document.querySelector('#password');
  if (tipo.type === 'password') {
    tipo.type = 'text';
  } else {
    tipo.type = 'password';
  }
};
