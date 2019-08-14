import { recoverUserName, changeViewToProfile, signOutUser } from '../controller/home-controller.js';
import { savePost, showPost } from '../controller/post-controller.js';
import { getName } from '../controller/register-controller.js';
export const home = () => {
  const home = document.createElement('div');

  const homeContent = `
  <header>
    <h2>tasty recipes</h2> 
    <nav>
      <ul class="nav-links">
        <li><a id="user-name">User</a></li>
        <li><a href="#/about">about</a></li>
        <li><a id="signOut">Cerrar Sesión</a></li>
      </ul>
    </nav>    
  </header>
  <main>
      <h1>Responsive Header</h1>
      <!--<div id="profile"></div>-->
      <div id="user-perfil"></div>
      <form id="form-publication" maxlength=50 class="flex-form" required>
        <textarea placeholder="¿Que quieres compartir?" id="publication"></textarea>
        <input type="submit" id="compartir-post" class="button-login" value="Compartir">
      </form> 
      <table class="table my-3">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">User</th>
          <th scope="col">Message</th>
          <th scope="col">Editar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody id="listOfPublications">
        
      </tbody>
    </table>
  </main>
  <footer></footer>
    `;
  home.innerHTML = homeContent;

  const userName = home.querySelector('#user-name');
  const allPublications = home.querySelector('#listOfPublications');

  const btnSignOut = home.querySelector('#signOut');
  // const notePost = home.querySelector('#publication').value;
  const btnComportirPost = home.querySelector('#compartir-post');

  btnSignOut.addEventListener('click', signOutUser);
  recoverUserName(userName);


  userName.addEventListener('click', changeViewToProfile);

  btnComportirPost.addEventListener('click', savePost);

  showPost(allPublications);
  return home;
};
