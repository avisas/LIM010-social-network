import { updateUserName } from '../controller/profile-controller.js'
import { userCurrent } from '../controller/login-controller.js'

export default () => {
  const use = userCurrent();
  const profile = document.createElement('div');
  const profileContent = `    
    <h2>Profile</h2> 
    <img src="https://cdn1.iconfinder.com/data/icons/avatars-heads/154/eat-food-man-head-avatar-512.png">
    <input id='fileid' type='file' hidden/>
    <input id='fileButton' type='button' value='Upload MB' />
    
    <form>
    <input type="text" value="${use.displayName}" class="inputForm" id="name">
    <input type="text" value="${use.email}" disabled class="inputForm" id="name">

    <input type="submit" class="button-login" id="button-save" value="Guardar">
    </form>
    `;

  profile.innerHTML = profileContent;
  const save = profile.querySelector('#button-save');
  
  save.addEventListener('click', () => {
    event.preventDefault();
    const user = userCurrent();
    const newName = profile.querySelector('#name').value;
    updateUserName(user, newName).then(function () {
      // Update successful.
      location.hash = '#/home';
    });
  });

  return profile;
};