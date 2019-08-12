import { recoverUserName, pushPublication, pullAllPublications, changeViewToProfile } from '../controller/home-controller.js';

export const home = () => {
  const home = document.createElement('div');

  const homeContent = `
  <header>
    <h2>tasty recipes</h2> 
    <nav>
      <ul class="nav-links">
        <li><a id="user-name">User</a></li>
        <li><a href="#/about">about</a></li>
        <li><a href="#/">Cerrar Sesión</a></li>
      </ul>
    </nav>    
  </header>
  <main>
      <h1>Responsive Header</h1>
      <!--<div id="profile"></div>-->
      <form id="form-publication" maxlength=50 class="flex-form" required>
        <textarea placeholder="¿Que quieres compartir?" id="publication"></textarea>
        <input type="submit" name="" class="button-login" value="Compartir">
      </form>
      <ul id="listOfPublications"></ul>
  </main>
  <footer></footer>
    `;
  home.innerHTML = homeContent;

  const userName = home.querySelector('#user-name');
  const formPublication = home.querySelector('#form-publication');
  const allPublications = home.querySelector('#listOfPublications');

  recoverUserName(userName);

  formPublication.addEventListener('submit', () => {
    console.log('Se ejecutó submit');
    pushPublication(event);
    renderAllPublications(allPublications, pullAllPublications());
  });

  userName.addEventListener('click', changeViewToProfile);

  renderAllPublications(allPublications, pullAllPublications());

  return home;
};

export const renderAllPublications = (element, list) => {
  console.log('Se ejecutó el render');
  element.innerHTML= '';
  for (let publication of list) {
    let listItem = document.createElement('li');
    listItem.innerHTML = `
      Publicado por ${publication.displayName}. El mensaje es: ${publication.message}
      <a id="L${publication.id}">Like</a>
      <a id="E${publication.id}">Edit</a>
    `;
    element.appendChild(listItem);
  }
};