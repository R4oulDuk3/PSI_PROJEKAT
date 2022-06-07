import{downloadImage} from "./index.js"
var idEventa;
function prijaviEvent(id){
    document.getElementsByClassName("rez")[0].style.display = "flex";
    idEventa = id;
    $('.hover_bkgr_fricc').show();
    
}

async function otkaziDog(event){
    let msg={"event":event};
    await postData("apiDeleteReserve",msg);
    alert("Dogadjaj "+event + " je otkazan");
}

async function reservisi(){
    console.log("USO")
    let broj = document.getElementById("brLjudi").value;
    let tel = document.getElementById("telefon").value;

    let msg = {"noofseats":broj, "phone":tel, "id":idEventa };

    await postData("apiReserve",msg);
}


let flag1 = 1;
let flag2= 1;

function validate(id){
    let errTrig = document.getElementById(id);
    /*if (errTrig.id == "brLjudi") {
        
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
        }*/
    if(flag1 && flag2){
        document.getElementById("dugmeRez").disabled = false;;
    }
    }


var myEvs = []
$(document).ready(async function() {

    $('.popupCloseButton').click(function(){
        $('.rez').hide();
    });

    $("#brLjudi").change(function(){
        validate("brLjudi");
    });

    $("#telefon").change(function(){
        validate("telefon");
    });
    $("#dugmeRez").click(async function(){

        await reservisi();
        $("#formaRez").submit();
    });

    await $.get("apiEventReservations", async function(json) {
        await popuniRez(json);
        
     });

    await $.get("apiEvents",async function(json) {
        $('#divisor').hide();
        $('#going').hide();
        $('#mojiDog').hide();
       await popuniEvents(json);
    });
  

   




    async function popuniEvents(json) {
        let dogadjaji = document.getElementById("possible");
        let container = document.createElement("div");
        container.classList.add("grid");     
        for(let item of json){
            if(myEvs.includes(item.idevents))
                continue;
            let kartica = document.createElement("div");
            kartica.classList.add("card");
            kartica.setAttribute("id","event"+item.idevents);
            kartica.style.backgroundImage = "linear-gradient(rgba(50, 50, 50, 0.5),rgba(50,50,50,0.5)), url(" + await downloadImage(item.picture)+")";
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
                prijaviEvent(item.idevents)});
  
            cont.appendChild(titl);
            //cont.appendChild(desc);
            kartica.appendChild(cont);
            container.appendChild(kartica);
          }
        dogadjaji.appendChild(container);
        
        }



       async function popuniRez(json) {

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
                myEvs.push(item.idevents);
                kartica.style.backgroundImage = "linear-gradient(rgba(50, 50, 50, 0.5),rgba(50,50,50,0.5)), url(" + await downloadImage(item.picture)+")";
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
                kartica.addEventListener("click",function(){
                    otkaziDog(item.idevents)});
      
                cont.appendChild(titl);

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
