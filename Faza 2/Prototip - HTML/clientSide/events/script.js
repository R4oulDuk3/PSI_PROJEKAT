let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll=() =>{
    navbar.classList.remove('active');
}


function prijaviEvent(id){

    alert(id);

}

$(document).ready(function() {

    //let ceo = document.getElementsByClassName("qrkod")[0];
    //ceo.style.display="none";

    $.getJSON("data.json", function(json) {
        console.log(json);
       popuniEvents(json);
    });
  
    function popuniEvents(json) {
        dogadjaji = document.getElementById("possible");
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
    });