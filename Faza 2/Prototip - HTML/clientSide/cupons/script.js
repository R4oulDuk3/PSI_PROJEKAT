let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll=() =>{
    navbar.classList.remove('active');
}

function change(){
    var myEle = document.getElementById("bought-invis");
    if (myEle) {
        document.getElementById("purch-vis").id= "purch-invis";
        document.getElementById("swap").textContent = " Kupovina kupona ";
        document.getElementById("bought-invis").id="bought-vis"
    }
    else{
    document.getElementById("bought-vis").id = "bought-invis";
    document.getElementById("swap").textContent = " Moji kuponi ";
    document.getElementById("purch-invis").id = "purch-vis";
    }
}

function displayForm(){

    var r = /\d+/
    let s = event.target.parentNode.parentNode.id;
    let niz = document.getElementsByClassName("form-popup");

    let num = parseInt(s.match(r)); 

    niz[num-1].style.display = "block";


}


  
  function closeForm() {
    var r = /\d+/
    let s = event.target.parentNode.parentNode.parentNode.parentNode.id;
    let niz = document.getElementsByClassName("form-popup");

    let num = parseInt(s.match(r)); 

    niz[num-1].style.display = "none";


  }