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