
/* eslint-disable import/no-cycle */
import { updateProfile, getData } from '../controller/profile-controller.js';

export default () => {
  const profile = document.createElement('div');
  const profileContent = `    
    <h2>Profile</h2> 
    <img src="https://cdn1.iconfinder.com/data/icons/avatars-heads/154/eat-food-man-head-avatar-512.png">
    <input id='fileid' type='file' hidden/>
    <input id='fileButton' type='button' value='Upload MB' />
    
    <form>
    <input type="text" value="" class="inputForm" id="name">
    <input type="text" value="" disabled class="inputForm" id="email">

    <input type="submit" class="button-login" id="button-save" value="Guardar">
    </form>
    `;

  profile.innerHTML = profileContent;
  const name = profile.querySelector('#name');
  const email = profile.querySelector('#email');
  getData(name, email);
  const save = profile.querySelector('#button-save');
  save.addEventListener('click', (event) => {
    event.preventDefault();
    const newName = profile.querySelector('#name').value;
    const newEmail = profile.querySelector('#email').value;

    updateProfile(newName, newEmail).then(() => {
      // Update successful.
      window.location.hash = '#/home';
    });
  });

  return profile;
};
