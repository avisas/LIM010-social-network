/* eslint-disable import/no-cycle */
import { updateProfile, getData } from '../controller/profile-controller.js';
import { userCurrent } from '../controller-firebase/controller-authentication.js';

export default () => {
  const profile = document.createElement('div');
  profile.className = 'profile-div';
  const profileContent = `   
    <h2>Profile</h2> 
    ${userCurrent().photoURL !== null ? `<img class="img-user" src="${userCurrent().photoURL}">` : '<img class="img-avatar" src="https://icon-library.net/images/avatar-icon-png/avatar-icon-png-16.jpg">'}
    <form class="form-profile">
    <input type="text" value="" class="inputForm" id="name">
    <input type="text" value="" disabled class="inputForm" id="email">

    <input type="submit" class="button-login" id="button-save" value="Guardar">
    <input type="submit" class="button-login" id="button-return" value="Regresar">
    </form>
    `;

  profile.innerHTML = profileContent;
  const name = profile.querySelector('#name');
  const email = profile.querySelector('#email');
  getData(name, email);
  const save = profile.querySelector('#button-save');
  save.addEventListener('click', (event) => {
    event.preventDefault();
    const newName = name.value;
    const newEmail = email.value;

    updateProfile(newName, newEmail).then(() => {
      // Update successful.
      window.location.hash = '#/codeMeet';
    });
  });

  const returnHome = profile.querySelector('#button-return');
  returnHome.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/codeMeet';
  });

  return profile;
};
