
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

    $.getJSON("kuponi_data.json", function(json) {


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
            
            let img = document.createElement("div");
            img.classList.add("image");
            let slika = document.createElement("img");
            slika.setAttribute("src","../../assets/beer.jpg"); // TODO Promeni path da bude sa servera
            slika.setAttribute("alt","kupon "+item.idcupon);
            slika.addEventListener("click",function(){
                getQR("kuponBr"+item.idcupon);
            });
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
    });