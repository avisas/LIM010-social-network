/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import register from './register-view.js';
import login from './login-view.js';
import profile from './profile-view.js';
import codeMeet from './codeMeet.js';
import { home } from './home-view.js';
import { myPost } from './myPost-view.js';

export const components = {
  login,
  register,
  profile,
  codeMeet,
  home,
  myPost,
};
