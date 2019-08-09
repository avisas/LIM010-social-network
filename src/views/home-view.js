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

    const inicializateFire = (event) => {
      firebase.auth().onAuthStateChanged(function(user){
        if(user){
          let displayName = user.displayName;
          let userPhoto = user.photoURL;
          let userEmail = user.email;

          userName.textContent = displayName;
          
        }
      })
    } 
    inicializateFire();
    return home;
  };