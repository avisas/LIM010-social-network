<<<<<<< HEAD
import { changeView } from './controller-view/index.js';

const initRouter = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

const init = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCWivbURhE6qmYSjZSqxbaYsrZwL2YQqLQ',
    authDomain: 'sosial-network-c0237.firebaseapp.com',
    databaseURL: 'https://sosial-network-c0237.firebaseio.com',
    projectId: 'sosial-network-c0237',
    storageBucket: 'sosial-network-c0237.appspot.com',
    messagingSenderId: '625296739587',
    appId: '1:625296739587:web:f5e413abb9ab5386',
  };
  firebase.initializeApp(firebaseConfig);
  initRouter();
};

window.onload = init();
=======
/* eslint-disable import/no-cycle */
//import firebase from 'firebase';
//import 'firebase/storage'; 
import { changeView } from './controller-view/index.js';
//import * as admin from 'firebase-admin';


const firebaseConfig = {
  // apiKey: 'AIzaSyDRfwgljtnkk2mUrYDMcSEumDulfkHe9Uk',
  // authDomain: 'social-network-2c5f9.firebaseapp.com',
  // databaseURL: 'https://social-network-2c5f9.firebaseio.com',
  // projectId: 'social-network-2c5f9',
  // storageBucket: 'social-network-2c5f9.appspot.com',
  // messagingSenderId: '319072321809',
  // appId: '1:319072321809:web:c6c4023a67eb540e',
  apiKey: "AIzaSyDRfwgljtnkk2mUrYDMcSEumDulfkHe9Uk",
  authDomain: "social-network-2c5f9.firebaseapp.com",
  databaseURL: "https://social-network-2c5f9.firebaseio.com",
  projectId: "social-network-2c5f9",
  storageBucket: "social-network-2c5f9.appspot.com",
  messagingSenderId: "319072321809",
  appId: "1:319072321809:web:9dcf43264a0f5dcf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const dataBase = firebase.firestore();

export const admin = require('firebase-admin');
export const storage = firebase.storage();
const serviceAccount = require("../social-network-2c5f9-firebase-adminsdk-e91x2-00ee254448.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://social-network-2c5f9.firebaseio.com"
});

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

window.addEventListener('load', init);
>>>>>>> 3c233a72927f7ab35848f80d7a100971e8d813a5
