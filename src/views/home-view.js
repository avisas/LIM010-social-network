import { recoverUserName } from '../controller/home-controller.js';

export default () => {
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
      <div id="profile"></div>
  </main>
  <footer></footer>
    `;
    home.innerHTML = homeContent;
    //document.getElementById("page2").appendChild(formRegister);
    const userName = home.querySelector('#user-name');
    recoverUserName(userName);
    userName.addEventListener('click',()=>{
      location.hash = '#/profile';
    });
    return home;
  };