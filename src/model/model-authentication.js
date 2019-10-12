/* eslint-disable max-len */
export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const userCurrent = () => firebase.auth().currentUser;

export const signOutLogin = () => firebase.auth().signOut();

export const createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
