export const profile = () => {
    const profile = document.createElement('div');
  
    const profileContent = `
    
    <h2>Profile</h2> 
    <form>
    <input type="text" name="name" placeholder="Nombre" class="inputForm" id="name">
    <input type="submit" name="" class="button-login" value="Log In">
    </form>
    `;
    profile.innerHTML = profileContent;
    
    return profile;
  };

 