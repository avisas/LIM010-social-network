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
    <input type="text" value="" class="inputForm" id="job">
    <input type="text" value="" class="inputForm" id="description">

    <input type="submit" class="button-login" id="button-save" value="Guardar">
    <input type="submit" class="button-login" id="button-return" value="Regresar">
    </form>
    `;

  profile.innerHTML = profileContent;
  const name = profile.querySelector('#name');
  const email = profile.querySelector('#email');
  const job = profile.querySelector('#job');
  const description = profile.querySelector('#description');

  getData(name, email, job, description);
  const save = profile.querySelector('#button-save');
  save.addEventListener('click', (event) => {
    event.preventDefault();
    const newName = name.value;
    const newEmail = email.value;
    const newJob = job.value;
    const newDescription = description.value;

    updateProfile(newName, newEmail, newJob, newDescription).then(() => {
      // Update successful.
      console.log('Datos cambiados');
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
