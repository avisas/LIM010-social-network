import { registerFunction } from '../controller/register-controller.js';

export default () => {
  const formRegister = document.createElement('div');
  formRegister.className = 'container';

  const registerContent = `
  <div class="section-image">
  <img class="img-login" src="img/login-img.jpg">
</div>
<div class="login">
  <form id="form-register" class="flex-form">
    <h1>Tasty Recipes</h1>
    <p>¡Bienvenido Chefcito!</p>
    <input type="text" name="nickname" placeholder="Nickname" class="inputForm" id="nick">
    <input type="text" name="mail" placeholder="Email" class="inputForm" id="mail">
    <input type="password" name="pass" placeholder="Password" class="inputForm" id="pass">
    <input type="submit" class="button-login" id="button-register" value="Register">
  </form>
</div>
  `;
  formRegister.innerHTML = registerContent;

  const btnRegister = formRegister.querySelector('#button-register');

  btnRegister.addEventListener('click', registerFunction);
  return formRegister;
};