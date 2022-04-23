
var data = [
    {
        name: 'Zurka 1',
        desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        imgName: '../assets/zurkeNajave.png'
    }
]


$(document).ready(function (){

    data.forEach((zurka)=>{
        let dogajaj = $("<div class='card-content'></div>")
        naslov = $("<h2 class='card-title'>"+zurka.name+"</h2>")
        opis = $("<p class='card-body'>"+zurka.name+"</p>")
        dugme = $("<a href='#' class='button-card modal-btn-del'>Obrisi dogadjaj</a>")
        dogajaj.append(naslov)
        dogajaj.append(opis)
        dogajaj.append(dugme)
        $('grid').append(dogajaj) 
    })

})