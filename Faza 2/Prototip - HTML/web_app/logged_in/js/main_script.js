import{downloadImage} from "../../index.js"
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll=() =>{
    navbar.classList.remove('active');
}


function prikaziKod(){
    document.getElementsByClassName("userQR")[0].style.display = "flex";
    $('.hover_bkgr_friccQR').show();
    
}


$(document).ready(function() {
    
  $("#logged-user").click(function(){prikaziKod();});

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

  document.addEventListener("DOMContentLoaded", async event=>{
    const img = document.getElementById('usrQRCodeimg');
      img.setAttribute('src', await downloadImage("qrTEMP.png"));  
  })