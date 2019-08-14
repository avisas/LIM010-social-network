import { updateProfile } from '../controller/profile-controller.js';
import { userCurrent } from '../controller/login-controller.js';
import { getData } from '../controller/profile-controller.js';

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
  
  save.addEventListener('click', () => {
    event.preventDefault();
    const newName = profile.querySelector('#name').value;
    const email = profile.querySelector('#email').value;

    updateProfile(newName, email).then(function () {
      // Update successful.
      location.hash = '#/home';
    });
  });

  return profile;
};