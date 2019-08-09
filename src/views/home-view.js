import { recoverUserName } from '../controller/login-controller.js';

export default () => {
    const home = document.createElement('div');
  
    const homeContent = `
    <header>
    <h2>tasty recipes</h2> 
    <nav>
      <ul class="nav-links">
        <li><a id="user-name" href="#/">User</a></li>
        <li><a href="#/about">about</a></li>
        <li><a href="#/sesion">Cerrar Sesión</a></li>
      </ul>
    </nav>
  </header>
  <main>
      <h1>Responsive Header</h1>
      
  </main>
  <footer></footer>
    `;
    home.innerHTML = homeContent;
    //document.getElementById("page2").appendChild(formRegister);
    const userName = home.querySelector('#user-name');
     recoverUserName(userName);
    return home;
  };