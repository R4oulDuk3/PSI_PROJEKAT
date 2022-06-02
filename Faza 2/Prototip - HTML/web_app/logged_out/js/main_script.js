import {downloadImage} from "../../index.js";

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll=() =>{
    navbar.classList.remove('active');
}

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