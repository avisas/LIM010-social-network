export default () => {
    const home = document.createElement('div');
  
    const homeContent = `
    <h1>Aqui va el contenido del home</h1>    
    `;
    home.innerHTML = homeContent;
    //document.getElementById("page2").appendChild(formRegister);
  
    
    return home;
  };