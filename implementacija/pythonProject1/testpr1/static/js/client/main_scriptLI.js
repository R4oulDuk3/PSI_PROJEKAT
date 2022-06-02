import{downloadImage} from "./index.js"
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll=() =>{
    navbar.classList.remove('active');
}


var userQR = undefined;
var loggedUser;
async function generateQR(){
  loggedUser = await $.get("apiCheckLogInUser");
  if(loggedUser.idusers == -1){
    return 0;
  }
  document.getElementById("logged-user").textContent = loggedUser.name + " " + loggedUser.surname;
  let json = {
    "type":"unos_potrosnja",
    "iduser": loggedUser.idusers
  }
  if (userQR == undefined) {
    userQR = new QRCode(document.getElementById("usrQRCodeimg"),JSON.stringify(json));
  }
  else{
    userQR.clear();
    userQR.makeCode(JSON.stringify(json));
  }
  document.getElementById("usrQRCodeimg").title=""
}


function prikaziKod(){
    document.getElementsByClassName("userQR")[0].style.display = "flex";
    $('.hover_bkgr_friccQR').show();
    
}

async function logout(){
  await $.get('apiOutUser');
  window.location.replace("home.html");

}


$(document).ready(async function() {
  $("#logout").click(async function(){await logout();});
  $("#logged-user").click(function(){prikaziKod();});
    await generateQR()
    $('.popupCloseButtonQR').click(function(){
      $('.hover_bkgr_friccQR').hide();
  });

});


document.addEventListener("DOMContentLoaded", async event=>{
    const img = document.getElementById('logo');
      img.setAttribute('src', await downloadImage("logo.png"));
      
  })
  
  document.addEventListener("DOMContentLoaded", async event=>{
    const img = document.getElementsByClassName('bg');
    for (let i=0;i<img.length;i++){
      img[i].style.backgroundImage="linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url("+await downloadImage("background.jpg")+")";
    }
  })
