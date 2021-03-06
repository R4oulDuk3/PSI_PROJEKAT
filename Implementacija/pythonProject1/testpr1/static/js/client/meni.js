import{downloadImage} from "./index.js";

$(document).ready(async function() {

    await $.get('apiMeni',function(json) {

        popuniMeni(json);
    });

    function popuniMeni(json) {
        let arti = document.getElementById("artikli");        
        for(let item of json){
            
            let cvor = document.createElement("div");
            cvor.classList.add("tip");
            let gird = document.createElement("div");
            gird.classList.add("grid");
            for(let i of item.stavke){
                let cena = document.createElement("div");
                cena.classList.add("price");
                if(i.akcija == "0"){
                    cena.textContent = i.price + " rsd" ;
                }
                else{
                    i.akcija == "100" ? cena.textContent = " Besplatno " : cena.textContent = Math.floor(i.price - (i.price * parseInt(i.akcija) / 100)) + " rsd ";
                    let akc = document.createElement("span");
                    akc.textContent = i.price + " rsd";
                    cena.appendChild(akc);
                }
                let titl = document.createElement("div");
                titl.classList.add("item-title");
                titl.textContent = i.meniproduct+ " " + (Math.round(i.amount * 10) / 10) + "l";
                let ajtem = document.createElement("div");
                ajtem.classList.add("item");
                ajtem.appendChild(titl);
                ajtem.appendChild(cena);
                gird.appendChild(ajtem);
            }
            let nas = document.createElement("div");
            nas.classList.add("naslov");
            let h = document.createElement("h2");
            h.textContent = item.naziv;
            nas.appendChild(h);
            cvor.appendChild(nas);
            cvor.appendChild(gird);
            arti.appendChild(cvor);
            arti.appendChild(document.createElement("hr"));

        }
        }
    });

    document.addEventListener("DOMContentLoaded", async event=>{
        const img = document.getElementById('artikli');
          img.style.backgroundImage="linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)), url("+await downloadImage("menuBg.png")+")";
          
          
      })