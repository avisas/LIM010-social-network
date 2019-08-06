// Este es el punto de entrada de tu aplicacion

/*import { myFunction } from './lib/index.js';

myFunction();*/



let formAutenticacion;
inicializar = () => {
  formAutenticacion = document.getElementById("form-autenticacion");
  formAutenticacion.addEventListener("submit", userCreate, false);
}

userCreate = (event) => {
  event.preventDefault();
  var usuario = event.target.email.value;
  var contrasena = event.target.password.value;

  firebase.auth().createUserWithEmailAndPassword(usuario, contrasena)
    .then(function (result) {
      console.log('Usuario creado');
    })
    .catch(function (error) {
      console.log('Error');
    });
}
inicializar();