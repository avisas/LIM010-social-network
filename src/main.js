//import  {myFunction } from './lib/index.js';
const loginGoogle = document.getElementById("google");
const loginFacebook = document.getElementById("facebook");

let formAutenticacion ;

// Login de usuario
const signIn = (event) => {
  event.preventDefault();
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;
  firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
    .then(function (result) {
      alert('Ingresaste');
    })
    .catch(function (error) {
      alert('Error');
    });
}
formAutenticacion = document.getElementById("form-autenticacion");
formAutenticacion.addEventListener("submit", signIn);


const register = document.getElementById("register");
register.addEventListener('click', () => {
  const formRegister = document.createElement('div');
  const divContent = `<form id="form-register" class="flex-form">
  <h1>Social Network</h1>
  <input type="text" name="mail" placeholder="Email" class="inputForm" id="mail">
  <input type="password" name="pass" placeholder="Password" class="inputForm" id="pass">
  <input type="submit" class="button" id="button-register" value="Register">
  </form>
  `;
  formRegister.innerHTML = divContent;
  document.getElementById("page2").appendChild(formRegister);

  //const mail = formRegister.querySelector('#mail').value;
  //const password = formRegister.querySelector('#password').value;
  const btnRegister = formRegister.querySelector('#button-register');

  btnRegister.addEventListener('click', registerFunction);

//return formRegister;
});

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
      const errorCode = error.code;
      const  errorMessage = error.message;
      alert( `Error: ${errorMessage} Tipo:${errorCode}`);
    });
}


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


