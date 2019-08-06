//import  {myFunction } from './lib/index.js';

let formAutenticacion;
inicializar = () => {
  formAutenticacion = document.getElementById("form-autenticacion");
  formAutenticacion.addEventListener("submit", signIn);
}

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

// Login de usuario
const signIn = (event) => {
  event.preventDefault();
  const usuario = event.target.email.value;
  const contrasena = event.target.password.value;
  firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
  .then(function (result) {
    alert('Ingresaste')
  })
  .catch(function (error) {
    alert('Error');
  });
}

inicializar();