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
    let tooltip = document.getElementById(id).childNodes[1];
    tooltip.textContent = "Kopiran";
  }
  function outFunc(id) {
    var tooltip = document.getElementById(id).childNodes[1];
    tooltip.textContent = "Kopiraj";
  }

  $(document).ready(function() {

    $.getJSON("events.json", function(json) {
        popuniEvents(json);
    });

    function popuniEvents(json) {
        dogadjaji = document.getElementById("dogadjaji");
        let i = 0;
        
        let cvor = document.createElement("div");
        cvor.classList.add("box-container");        
        for(let item of json){
            let kartica = document.createElement("div");
            kartica.classList.add("box");
            let slika = document.createElement("img");
            slika.setAttribute("src","../assets/eventPNG.png"); // TODO Promeni path da bude sa servera
            slika.setAttribute("alt","Dogadjaj "+(++i));
            let titl = document.createElement("h3");
            titl.textContent = item.name;
            let link = document.createElement("a");
            link.setAttribute("href","#")
            link.classList.add("btn");
            link.textContent ="Saznaj vise";

            kartica.appendChild(slika);
            kartica.appendChild(titl);
            kartica.appendChild(link);
            cvor.appendChild(kartica);
            if(i==3)
              break;
          }
         dogadjaji.appendChild(cvor);

        }
    });

