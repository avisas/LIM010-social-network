/* eslint-disable import/no-cycle */
import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
import { savePost, showPost } from '../controller/post-controller.js';

export const home = () => {
  const homeDiv = document.createElement('div');

  const homeContent = `
  <header>
    <h2>Meet and Code</h2> 
    <div class="menu-bar">
      <a href="#" class="bt-menu"><span class="icon-menu"></span>Menu</a>
    </div>
    <nav>
      <ul class="nav-links">
        <li><a id="user-name"><span class="icon-user"></span>User</a></li>
        <li><a href="#/about"><span class="icon-question"></span>about</a></li>
        <li><a id="signOut"><span class="icon-exit"></span>Cerrar Sesión</a></li>
      </ul>
    </nav>    
  </header>
  <main>
      <!--<h1>Responsive Header</h1>-->
      <!--<div id="profile"></div>-->
      <div id="user-perfil"></div>
      <form id="form-publication" maxlength=50 class="flex-post" required>
        <textarea placeholder="¿Que quieres compartir?" id="publication" class="textarea-post"></textarea>
        <input type="submit" id="compartir-post" class="button-login" value="Compartir">
        <input type="submit" id="edit-post" class="button-login hide" value="Editar">
      </form> 
      <table class="table my-3">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">User</th>
          <th scope="col">Message</th>
          <th scope="col">Hora</th>
          <th scope="col">Editar</th>
          <th scope="col">Eliminar</th>
          <th scope="col">like</th>
          <th scope="col">count</th>
        </tr>
      </thead>
      <tbody id="listOfPublications">
        
      </tbody>
    </table>
  </main>
  <footer></footer>
    `;
  homeDiv.innerHTML = homeContent;

  const userName = homeDiv.querySelector('#user-name');
  const allPublications = homeDiv.querySelector('#listOfPublications');

  const btnSignOut = homeDiv.querySelector('#signOut');
  // const notePost = home.querySelector('#publication').value;
  const btnComportirPost = homeDiv.querySelector('#compartir-post');
  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);

  userName.addEventListener('click', changeViewToProfile);

  btnComportirPost.addEventListener('click', savePost);

  showPost(allPublications);
  return homeDiv;
};
