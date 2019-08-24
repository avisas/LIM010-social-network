/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, changeViewToMyPosts, signOutUser, changeViewToHome } from '../controller/home-controller.js';
import { savePost } from '../controller/post-controller.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import { listNotes } from './post-view.js';


export const home = (notes) => {
  const homeDiv = document.createElement('div');

  const homeContent = `
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
      <div id="user-perfil" class="user-perfil">
        <img class="img-profile" src="img/banner03.jpg">
        <div class="flex">
          
            ${userCurrent().photoURL !== null ? `<img src="${userCurrent().photoURL}">` : '<img class="img-avatar" src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-16.jpg">'}
          
          <h2>${userCurrent().displayName}</h2>
        </div>
      </div>
      <div>
        <div class="div-post">
          <form id="form-publication" maxlength=50 required>
            <textarea placeholder="¿Que quieres compartir?" id="publication" class="textarea-post"></textarea>
            <select id="privacidad" class="btn-select" name="select">
              <option value="publico" selected>Público</option> 
              <option value="privado">Privado</option>
            </select>
            <input type="submit" id="compartir-post" class="btn-share" value="Compartir">
          </form> 
        </div>
        
        <section>
          <ul id="notes-list" class="ul-parent">
          </ul>
        </section>
      </div>
  </main>
  <footer></footer>
    `;
  homeDiv.innerHTML = homeContent;

  const ul = homeDiv.querySelector('#notes-list');
  notes.forEach((note) => {
    ul.appendChild(listNotes(note));
  });

  const userName = homeDiv.querySelector('#user-name');
  const btnSignOut = homeDiv.querySelector('#signOut');
  const settingUser = homeDiv.querySelector('#setting');
  const btnComportirPost = homeDiv.querySelector('#compartir-post');
  const btnHome = homeDiv.querySelector('#home');

  // const btnMisPost = homeDiv.querySelector('#mis-post');
  userName.addEventListener('click', changeViewToMyPosts);

  // btnHome.addEventListener('click', changeViewToHome);

  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  settingUser.addEventListener('click', changeViewToProfile);

  btnComportirPost.addEventListener('click', savePost);

  const HambMenu = homeDiv.querySelector('#hamb-menu');
  const showHamb = homeDiv.querySelector('#show-hamb');
  let modoMenu = 0;

  HambMenu.addEventListener('click', () => {
    if (modoMenu === 0) {
      showHamb.classList.add('block');
      showHamb.classList.remove('hide');
      modoMenu = 1;
    } else {
      showHamb.classList.add('hide');
      showHamb.classList.remove('block');
      modoMenu = 0;
    }
  });
  return homeDiv;
};