
function copyText(id) {
    let copyText = document.getElementById(id).value;
    navigator.clipboard.writeText(copyText);
    let tooltip = document.getElementById(id).childNodes[1];
    tooltip.textContent = "Kopiran";
  }
  function outFunc(id) {
    var tooltip = document.getElementById(id).childNodes[1];
    tooltip.textContent = "Kopiraj";
  }
  
  
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: window.screen.width>660? 2:1,
    spaceBetween: 30,
    slidesPerGroup: window.screen.width>660? 2:1,
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
  
  
    $.getJSON("home_events_data.json", function(json) {
        popuniEvents(json);
    });
  
    function popuniEvents(json) {
        dogadjaji = document.getElementById("dogadjaji");
        let i = 0;
        
        
        for(let item of json){
          let cvor = document.createElement("div");
          cvor.classList.add("swiper-slide");
          cvor.classList.add("card");
            let kartica = document.createElement("div");
            kartica.classList.add("card-content");
            let img = document.createElement("div");
            img.classList.add("image");
            let slika = document.createElement("img");
            slika.setAttribute("src","../assets/eventPNG.png"); // TODO Promeni path da bude sa servera
            slika.setAttribute("alt","Dogadjaj "+(++i));
            img.appendChild(slika);
  
            let namCon = document.createElement("div");
            namCon.classList.add("eventName");
            let ime = document.createElement("span");
            ime.classList.add("name");
            ime.textContent = item.name
            namCon.appendChild(ime);
        
            kartica.appendChild(img);
            kartica.appendChild(namCon);
            cvor.appendChild(kartica);
            dogadjaji.appendChild(cvor);
            if(i==6)
              break;
          }
         
  
        }
    });
  
    
  
  
  