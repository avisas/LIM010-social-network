
export const registerFunction = (event) => {
  event.preventDefault();
  const regMessageErrorLabel = document.getElementById("registerMessageError");
  const email = document.querySelector('#mail').value;
  const password = document.querySelector('#pass').value;
  console.log(email);
  console.log(password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      regMessageErrorLabel.classList.remove("show-message-error");
      regMessageErrorLabel.innerHTML = '';
      console.log(result);
      alert('Usuario creado correctamente')
    })
    .catch((error) => {
      regMessageErrorLabel.classList.add("show-message-error");
      switch (error.code) {
        case 'auth/weak-password':
          regMessageErrorLabel.innerHTML = 'La contraseña debe tener 6 ó mas caracteres';
          break;
        case 'auth/invalid-email':
          regMessageErrorLabel.innerHTML = 'No se escribió correo electrónico válido';
          break;
        default:
          regMessageErrorLabel.innerHTML = 'Se ha producido un error';
          console.log(`code: "${error.code}" & message: ${error.message}`);
      }
    });
};