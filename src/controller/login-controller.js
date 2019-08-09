export const loginFunction = (event) => {
    event.preventDefault();
    const usuario = event.target.email.value;
    const contrasena = event.target.password.value;
    firebase.auth().signInWithEmailAndPassword(usuario, contrasena)
      .then(function (result) {
        alert('Ingresaste');
        location.hash = '#/home';
      })
      .catch(function (error) {
        alert('Error');
      });
  };

 export const signInFacebook = (event) => {
    event.preventDefault();
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      console.log(result);
      alert('ingresaste con fb');
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
        let token = result.credential.accessToken;
        let user = result.user;
        alert('ingresaste con google')
        location.hash = '#/home';
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
/* const inicializateFire = (event) => {
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      let displayName = user.displayName;
      let userPhoto = user.photoURL;
      let userEmail = user.email;
    }
  })
} */