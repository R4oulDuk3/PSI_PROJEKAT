import{downloadImage} from "../../index.js"

function prijaviEvent(id){
    document.getElementsByClassName("rez")[0].style.display = "flex";
    idEventa = id;
    $('.hover_bkgr_fricc').show();
    
}

function otkaziDog(event){
    alert(event + " otkazan");
}

function rezervisi(){
    let ime = document.getElementById("imeIprez").value;
    let broj = document.getElementById("brLjudi").value;
    let tel = document.getElementById("telefon").value;

    let msg = {name:ime, amount:broj, number:tel, evt:idEventa };
    const msgJSON = JSON.stringify(msg);
    //post(msgJSON);
}


let flag1 = 0;
let flag2= 0;

function validate(id){
    errTrig = document.getElementById(id);
    if (errTrig.id == "brLjudi") {
        
        if(isNaN(errTrig.value)){
            document.getElementById("Error").textContent="GRESKA: Los broj ljudi";
            flag1=0;
        }
        else{
            document.getElementById("Error").textContent="";
            flag1=1;
        } 
    }else{
        if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/.test(errTrig.value)==false){
            document.getElementById("Error").textContent="GRESKA: Nije validan broj telefona";
            flag2=0;
        }
        else{
            document.getElementById("Error").textContent="";
            flag2=1;
        }
    if(flag1 && flag2){
        document.getElementById("dugmeRez").disabled = false;;
    }
    }
}

$(document).ready(function() {



    $('.popupCloseButton').click(function(){
        $('.rez').hide();
    });

    $.getJSON("events_data.json", function(json) {
        $('#divisor').hide();
        $('#going').hide();
        $('#mojiDog').hide();
       popuniEvents(json);
    });
  

    $.getJSON("events_reserved_data.json", function(json) {
       
        popuniRez(json);
     
    });




    function popuniEvents(json) {
        let dogadjaji = document.getElementById("possible");
        let container = document.createElement("div");
        container.classList.add("grid");     
        for(let item of json){

            let kartica = document.createElement("div");
            kartica.classList.add("card");
            kartica.setAttribute("id","event"+item.idevents);
            kartica.style.backgroundImage = "linear-gradient(rgba(50, 50, 50, 0.5),rgba(50,50,50,0.5)), url(../../assets/eventPNG.png)";
            kartica.style.backgroundSize = "cover";
            let cont = document.createElement("div");
            cont.classList.add("card-content");
            let titl = document.createElement("h2");
            titl.classList.add("card-title");
            titl.textContent = item.name; 
           /* let desc = document.createElement("button");
            desc.classList.add("btn");
            desc.textContent = "Prijavi me";*/
            kartica.addEventListener("click",function(){
                prijaviEvent("event"+item.idevents)});
  
            cont.appendChild(titl);
            //cont.appendChild(desc);
            kartica.appendChild(cont);
            container.appendChild(kartica);
          }
        dogadjaji.appendChild(container);
        
        }



        function popuniRez(json) {

            if(!Object.keys(json).length){
                $('#divisor').hide();
                $('#mojiDog').hide();
            }else{
                
            document.getElementById("divisor").style.display="block";
            let dogadjaji = document.getElementById("going");
            let container = document.createElement("div");
            container.classList.add("grid");        
            for(let item of json){
                let kartica = document.createElement("div");
                kartica.classList.add("card");
                kartica.setAttribute("id","event"+item.idevents);
                kartica.style.backgroundImage = "linear-gradient(rgba(50, 50, 50, 0.5),rgba(50,50,50,0.5)), url(../../assets/eventPNG.png)";
                kartica.style.backgroundSize = "cover";
                let cont = document.createElement("div");
                cont.classList.add("card-content");
                let titl = document.createElement("h2");
                titl.classList.add("card-title");
                titl.textContent = item.name+" ";
                let status = document.createElement("i");
                status.classList.add("fa-solid");
                status.classList.add(item.approved? "fa-check" : "fa-clock");
                titl.appendChild(status);

               /* let desc = document.createElement("button");
                desc.classList.add("btn");
                desc.textContent = "Prijavi me";*/
                kartica.addEventListener("click",function(){
                    otkaziDog("event"+item.idevents)});
      
                cont.appendChild(titl);
                //cont.appendChild(desc);
                kartica.appendChild(cont);
                container.appendChild(kartica);
              }
            dogadjaji.appendChild(container);
    
            $('#divisor').show();
            $('#going').show();
            $('#mojiDog').show();
            }


            }
    });
