/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
import register from './register-view.js';
import login from './login-view.js';
// eslint-disable-next-line import/named
import { home } from './home-view.js';
import profile from './profile-view.js';
import codeMeet from './codeMeet.js';
import { myPost } from './myPost-view.js';

export const components = {
  login,
  register,
  home,
  profile,
  codeMeet,
  myPost,
};
