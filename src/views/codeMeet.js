/* eslint-disable no-tabs */
/* eslint-disable import/no-cycle */

import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';
import { home } from './home-view.js';
import { showPostFirebase, showPostUserFirebase } from '../controller-firebase/controller-post.js';

export default () => {
  const headerDiv = document.createElement('div');
  const headerContent = `
	<header>
		<h2>Meet and Code</h2> 
    <nav class="nav-links flex menu-bar">
    <a  id="hamb-menu" class="bt-menu"><span class="icon-menu"></span></a>
			<ul id="show-hamb" class="hide list-menu"
				<li><a id="user-name" >User</a></li>
				<li><a id="homePag">Home</a></li>
				<!--<li><a id=""">About</a></li>-->
				<li><a id="setting">Setting</a></li>
				<li><a id="signOut">Log Out</a></li>
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
      <div id="content-post">
        
      </div>
  </main>-
		`;

  headerDiv.innerHTML = headerContent;
  const userName = headerDiv.querySelector('#user-name');
  const btnSignOut = headerDiv.querySelector('#signOut');
  const settingUser = headerDiv.querySelector('#setting');
  const btnMyPost = headerDiv.querySelector('#user-name');

  const contenPost = headerDiv.querySelector('#content-post');
  const homePag = headerDiv.querySelector('#homePag');

  showPostFirebase((notes) => {
    contenPost.innerHTML = '';
    contenPost.appendChild(home(notes));
  });

  homePag.addEventListener('click', () => {
    showPostFirebase((notes) => {
      contenPost.innerHTML = '';
      contenPost.appendChild(home(notes));
    });
  });

  btnMyPost.addEventListener('click', () => {
    showPostUserFirebase((notes) => {
      contenPost.innerHTML = '';
      contenPost.appendChild(home(notes));
    });
  });

  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  settingUser.addEventListener('click', changeViewToProfile);

  const HambMenu = headerDiv.querySelector('#hamb-menu');
  const showHamb = headerDiv.querySelector('#show-hamb');
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
  return headerDiv;
};
