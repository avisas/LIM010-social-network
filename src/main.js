 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyDRfwgljtnkk2mUrYDMcSEumDulfkHe9Uk",
  authDomain: "social-network-2c5f9.firebaseapp.com",
  databaseURL: "https://social-network-2c5f9.firebaseio.com",
  projectId: "social-network-2c5f9",
  storageBucket: "",
  messagingSenderId: "319072321809",
  appId: "1:319072321809:web:c6c4023a67eb540e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

import { changeView } from './controller-view/index.js'

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
}

window.addEventListener('load', init);