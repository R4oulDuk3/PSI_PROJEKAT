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


function openForm() {
    document.getElementById("popForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("popForm").style.display = "none";
  }