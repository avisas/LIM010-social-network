export const signIn = (email, password) => { 
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signInWithFacebook = (provider) => { 
  return firebase.auth().signInWithPopup(provider);
};
