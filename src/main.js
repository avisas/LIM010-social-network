import { registerTemplate } from './views/register-view.js';
import { loginTemplate} from './views/login-view.js';

loginTemplate();

const register = document.getElementById("register");
register.addEventListener('click', () => {
  registerTemplate();
});

