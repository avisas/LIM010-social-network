import { registerFunction } from '../controller/register-controller.js';

export const registerTemplate = () => {
  const formRegister = document.createElement('div');
  const divContent = `<form id="form-register" class="flex-form">
  <h1>Social Network</h1>
  <input type="text" name="mail" placeholder="Email" class="inputForm" id="mail">
  <input type="password" name="pass" placeholder="Password" class="inputForm" id="pass">
  <input type="submit" class="button" id="button-register" value="Register">
  </form>
  `;
  formRegister.innerHTML = divContent;
  document.getElementById("page2").appendChild(formRegister);

  const btnRegister = formRegister.querySelector('#button-register');

  btnRegister.addEventListener('click', registerFunction);
  return formRegister;
};

