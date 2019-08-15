export const signIn = (email, password) => { 
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signInWithFacebook = (provider) => { 
  return firebase.auth().signInWithPopup(provider);
};

export const userCurrent = () => firebase.auth().currentUser;

export const signOutLogin = () => firebase.auth().signOut();

export const createUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
