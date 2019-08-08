export const registerFunction = (event) => {
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
      alert('Error');
    });
};