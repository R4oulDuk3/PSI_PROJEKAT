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

    $('.popupCloseButtonQR').click(function(){
      $('.hover_bkgr_friccQR').hide();
  });

});