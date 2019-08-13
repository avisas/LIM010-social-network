export const loginFunction = (event) => {
  event.preventDefault();
  const messageErrorLabel = document.getElementById("LoginMessageError");
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;
  firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
    .then((result) => {
      messageErrorLabel.classList.remove("show-message-error");
      messageErrorLabel.innerHTML = '';
      location.hash = '#/home';
      console.log(result);
      location.hash = '#/home';
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
        case 'auth/invalid-email':
          messageErrorLabel.innerHTML = 'No se ingresó ningún correo electrónico';
          break
        default:
          messageErrorLabel.innerHTML = 'Se ha producido un error';
          console.log(`code: "${error.code}" & message: ${error.message}`);
      }
    });
};

export const signInFacebook = (event) => {
  event.preventDefault();
  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    location.hash = '#/home';
  }).catch(function (error) {
    console.log(error);
  })
};

export const signInGoogle = (event) => {
  event.preventDefault();
  if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      location.hash = '#/home';
    }).catch(function (error) {
      let errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Es el mismo usuario');
      }
    });
  } else {
    firebase.auth().signOut();
  };
};
export const userCurrent = () => {
    return firebase.auth().currentUser;
};
