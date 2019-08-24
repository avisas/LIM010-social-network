/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
// eslint-disable-next-line object-curly-newline
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import { listNotes } from './post-view.js';

export const myPost = (myNotes) => {
  const myPostDiv = document.createElement('div');
  const myPostContent = `
  <header>
    <h2>Meet and Code</h2> 
    <nav class="nav-links flex menu-bar">
    <a  id="hamb-menu" class="bt-menu"><span class="icon-menu"></span></a>
    <ul id="show-hamb" class="hide list-menu">
        <li><a href="#/myPost" id="user-name"><span class="icon-user"></span>User</a></li>
        <li><a href="#/home" id="home">Home</a></li>
        <li><a id="setting">Setting</a></li>
        <li><a id="signOut"><span class="icon-exit"></span>Cerrar Sesión</a></li>
      </ul>
    </nav>   
  </header>
  <main>
    <div id="user-perfil">
    <img class="img-profile" src="img/banner03.jpg">
    <div>
      ${userCurrent().photoURL !== null ? `<img src="${userCurrent().photoURL}">` : '<img src="">'}
      <h2>
    </div>
    </div>
    <div>
      
    <section>
      <ul id="myPostNotes-list">
      </ul>
    </section>
  </main>
  <footer></footer>
    `;
  myPostDiv.innerHTML = myPostContent;

  const ulMyPost = myPostDiv.querySelector('#myPostNotes-list');
  myNotes.forEach((note3) => {
    ulMyPost.appendChild(listNotes(note3));
  });

  const userName = myPostDiv.querySelector('#user-name');
  const btnSignOut = myPostDiv.querySelector('#signOut');
  const settingUser = myPostDiv.querySelector('#setting');
  // const btnHome = myPostDiv.querySelector('#home');
  // const btnComportirPost = homeDiv.querySelector('#compartir-post');

  // const btnMisPost = homeDiv.querySelector('#mis-post');
  // userName.addEventListener('click', changeViewToMyPosts);

  // btnHome.addEventListener('click', changeViewToHome);

  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  settingUser.addEventListener('click', changeViewToProfile);

  // btnComportirPost.addEventListener('click', savePost);

  return myPostDiv;
};
