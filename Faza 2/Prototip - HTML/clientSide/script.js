let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll=() =>{
    navbar.classList.remove('active');
}

function copyText(id) {
    /* Get the text field */
    let copyText = document.getElementById(id).value;
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
    /* Alert the copied text */
    let tooltip = document.getElementById("myTooltip");
    tooltip.textContent = "Kopiran";
  }
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.textContent = "Kopiraj";
  }