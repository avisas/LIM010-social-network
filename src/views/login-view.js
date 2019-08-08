import { loginFunction, signInFacebook, signInGoogle } from '../controller/login-controller.js';

export const loginTemplate = () => {
  const formLogin = document.createElement('div');
  formLogin.className = 'container';
  const divLogin = `
    <div class="section-image">
      <img class="img-login" src="img/login-img.jpg">
    </div>
    <div class="login">
      <form id="form-autenticacion" class="flex-form">
        <h1>Tasty Recipes</h1>
        <p>¡Bienvenido Chefcito!</p>
        <input type="text" name="email" value="" placeholder="Email" class="inputForm" id="email">
        <input type="password" name="password" value="" placeholder="Password" class="inputForm" id="password">
        <input type="submit" name="" class="button-login" value="Log In">
      </form>
      <div class="flex-form">
        <p>O bien ingresa con...</p>
        <div class="div-icon">
          <span id="facebook"><i class="fab fa-facebook iconfb"></i></span>
          <span id="google"><i class="fab fa-google iconGoogle"></i></span>
        </div>
        <label>¿No tienes una cuenta?&nbsp;<span id="register" class="bold">Registrate</span></label>
      </div>
    </div>
  `;
  formLogin.innerHTML = divLogin;
  document.getElementById("container").appendChild(formLogin);

  const formAutenticacion = formLogin.querySelector('#form-autenticacion');
  const loginFacebook = formLogin.querySelector('#facebook');
  const loginGoogle = formLogin.querySelector('#google');

  formAutenticacion.addEventListener("submit", loginFunction);
  loginFacebook.addEventListener('click', signInFacebook);
  loginGoogle.addEventListener('click', signInGoogle,false);
  return formLogin;
};