import{downloadImage} from "./index.js"
function getQR(id, iduser) {
    let ceo = document.getElementsByClassName("qrkod")[0];
    //let kupon = document.getElementById(id);
  //  let qr = fetch(id);
    kuponGenerator(id, iduser);
    if(ceo.style.display == "none") {
        ceo.style.display = "block";
    }    
}

function clearQR() {
    let ceo = document.getElementsByClassName("qrkod")[0];

    if(ceo.style.display == "block" ) {
        ceo.style.display = "none";
    }    
    let div = document.getElementById("kupon_qr");
    div.textContent = ""
    kuponQR = undefined;
    
}

var kuponQR = undefined;

async function kuponGenerator(id, iduser){
  //kupToStr = $.get("qrAPI");

  let format = {  "type":"kupon_kupovina",
  "idusers": iduser,
  "idcoupon": id
  }

  if (kuponQR == undefined) {
    kuponQR = new QRCode(document.getElementById("kupon_qr"),JSON.stringify(format));
  }
  else{
    kuponQR.clear();
    kuponQR.makeCode(JSON.stringify(format));
  }
  document.getElementById("kupon_qr").title=""
}



async function popuniKups(json, iduser) {
  let kuponi = document.getElementById("kuponi");
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
      slika.setAttribute('src',await downloadImage(item.picture));
      slika.setAttribute("alt","kupon "+item.idcupon);
      slika.addEventListener("click",function(){
          getQR(item.idcupon, iduser);
      });
      img.appendChild(slika);

      let namCon = document.createElement("div");
      namCon.classList.add("kuponName");
      let ime = document.createElement("span");
      ime.classList.add("name");
      ime.textContent = item.name;
      namCon.appendChild(ime);
  
      kartica.appendChild(img);
      kartica.appendChild(namCon);
      cvor.appendChild(kartica);
      kuponi.appendChild(cvor);
  }
}

$(document).ready(async function() {
  
  $(".ponistiKup").click(function(){clearQR();});
    let ceo = document.getElementsByClassName("qrkod")[0];
    ceo.style.display="none";
     //await $.get('apiHome',function(json))
    let json = await $.get("apiCoupons")
    let userSid= await $.get("apiCheckLogInUser");
    document.getElementById("poeni").textContent = userSid.salary
    await popuniKups(json, userSid.idusers);
    var swiper = new Swiper(".mySwiper",{
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
    });
/*
    document.addEventListener("DOMContentLoaded", async event=>{
      const img = document.getElementById('qrKodIMG');
        img.setAttribute('src', await downloadImage("qrTEMP.png"));  
    })*/
    document.addEventListener("DOMContentLoaded",async event=>{
      
      const img = document.getElementsByClassName('image');
      for (const i of img) {
      
        i.setAttribute('src',await downloadImage("no_img.png"));
      }
      
      
      });
    

      