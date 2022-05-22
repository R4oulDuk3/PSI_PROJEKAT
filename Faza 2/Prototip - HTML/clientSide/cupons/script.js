let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll=() =>{
    navbar.classList.remove('active');
}

function getQR(id) {
    let ceo = document.getElementsByClassName("qrkod")[0];
    //let kupon = document.getElementById(id);
  //  let qr = fetch(id);
    let img = document.getElementById("qrKodIMG");
    img.setAttribute("src","../../assets/qrTEMP.png");
    if(ceo.style.display == "none") {
        ceo.style.display = "block";
    }    
}

function clearQR() {
    let ceo = document.getElementsByClassName("qrkod")[0];

    if(ceo.style.display == "block" ) {
        ceo.style.display = "none";
    }    
    let img = document.getElementById("qrKodIMG");
    img.setAttribute("src","");
}


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  

$(document).ready(function() {

    let ceo = document.getElementsByClassName("qrkod")[0];
    ceo.style.display="none";

    $.getJSON("data.json", function(json) {


      popuniKups(json);


      function popuniKups(json) {
        kuponi = document.getElementById("kuponi");
        for(let item of json){
            let cvor = document.createElement("div");
            cvor.classList.add("swiper-slide");
            cvor.classList.add("card");
            let kartica = document.createElement("div");
            kartica.classList.add("card-content");
            kartica.setAttribute("id","kuponBr"+item.idcupon);
            kartica.addEventListener("click",function(){
                getQR("kuponBr"+item.idcupon);
            });
            let img = document.createElement("div");
            img.classList.add("image");
            let slika = document.createElement("img");
            slika.setAttribute("src","../../assets/beer.jpg"); // TODO Promeni path da bude sa servera
            slika.setAttribute("alt","kupon "+item.idcupon);
            img.appendChild(slika);

            let namCon = document.createElement("div");
            namCon.classList.add("kuponName");
            let ime = document.createElement("span");
            ime.classList.add("name");
            ime.textContent = item.description;
            namCon.appendChild(ime);
        
            kartica.appendChild(img);
            kartica.appendChild(namCon);
            cvor.appendChild(kartica);
            kuponi.appendChild(cvor);
        }

    }


    });
  

      
        /* dogadjaji = document.getElementById("kuponi");
        let container = document.createElement("div");
        container.classList.add("grid");        
        for(let item of json){
            let kartica = document.createElement("div");
            kartica.classList.add("card");
            kartica.setAttribute("id","kuponBr"+item.idcupon);
            kartica.style.backgroundImage = "linear-gradient(rgba(50, 50, 50, 0.5),rgba(50,50,50,0.5)), url(../../assets/beer.jpg)"
            kartica.style.backgroundSize = "cover";
            kartica.addEventListener("click",function(){
                getQR("kuponBr"+item.idcupon);
            });
            let cont = document.createElement("div");
            cont.classList.add("card-content");
            let titl = document.createElement("h2");
            titl.classList.add("card-title");
            titl.textContent = "Popust pivo"; //TODO PLACEHOLDER IME, AWAIT PROMENU BAZE
            let desc = document.createElement("p");
            desc.classList.add("card-body");
            desc.textContent = item.description;
  
            cont.appendChild(titl);
            cont.appendChild(desc);
            kartica.appendChild(cont);
            container.appendChild(kartica);
          }
         dogadjaji.appendChild(container);
  
        }*/
    });