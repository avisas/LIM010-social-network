/* eslint-disable import/newline-after-import */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-tabs */
/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
import { allNotes, myPostNotes } from '../controller/post-controller.js';
import { recoverDataProfile } from '../controller/profile-controller.js';

export default () => {
  const headerDiv = document.createElement('div');
  const headerContent = `
	<header>
		<h2>Meet and Code</h2> 
    <nav class="nav-links flex menu-bar">
    <a  id="hamb-menu" class="bt-menu"><span class="icon-menu"></span></a>
			<ul id="show-hamb" class="hide list-menu">
				<li><a id="user-name"><span class="icon-user">User</a></li>
				<li><a id="homePag" >Home</a></li>
				<li><a id="setting">Setting</a></li>
				<li><a id="signOut"><span class="icon-exit"></span>Log Out</a></li>
			</ul>
		</nav>    
  </header>
  
	<main>
      <div id="user-perfil" class="user-perfil">
        <img class="img-profile" src="https://designmodo.com/wp-content/uploads/2015/02/coding-page-illustration-page-header.png">
        <div class="flex">
        <img id="user-photo" class="user-photo">
        <h2 id="profile-name"></h2>
        <p id="job"></p>
        <p id="description"></p>
        </div>
      </div>
      <div id="content-post">
        
      </div>
  </main>-
		`;

  headerDiv.innerHTML = headerContent;
  const btnSignOut = headerDiv.querySelector('#signOut');
  const settingUser = headerDiv.querySelector('#setting');
  const btnMyPost = headerDiv.querySelector('#user-name');
  const profileName = headerDiv.querySelector('#profile-name');
  const homePag = headerDiv.querySelector('#homePag');
  const divPhotoUser = headerDiv.querySelector('#user-photo');
  const job = headerDiv.querySelector('#job');
  const description = headerDiv.querySelector('#description');

  allNotes(headerDiv);
  homePag.addEventListener('click', () => {
    allNotes(headerDiv);
  });

  btnMyPost.addEventListener('click', () => {
    myPostNotes(headerDiv);
  });

  btnSignOut.addEventListener('click', signOutUser);

  recoverUserName(btnMyPost, profileName, divPhotoUser);
  console.log(job);
  console.log(description);
  recoverDataProfile(job, description)
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

