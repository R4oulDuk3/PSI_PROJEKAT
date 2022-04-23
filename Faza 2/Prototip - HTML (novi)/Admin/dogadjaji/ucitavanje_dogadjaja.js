
var data = [
    {
        name: 'Zurka 1',
        desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        imgName: '../assets/zurkeNajave.png'
    },
    {
        name: 'Zurka 1',
        desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        imgName: '../assets/zurkeNajave.png'
    }
]


$(document).ready(function (){
    let grid = $('.grid').first();
    data.forEach((zurka)=>{
        let karta = $('<div></div>').addClass('card');
        let dogadjaj = $("<div></div>").addClass('card-content');
        let naslov = $("<h2></h2>").addClass('card-title').append(zurka.name);
        let opis = $("<p></p>").addClass('card-body').append(zurka.desc);
        let dugme = $("<a></a>").attr('href','#').addClass('button-card').addClass('modal-btn-del').append('Obrisi dogadjaj');
        dogadjaj.append(naslov);
        dogadjaj.append(opis);
        dogadjaj.append(dugme);
        karta.append(dogadjaj);
        karta.css('background-image',"url("+zurka.imgName+")");
        var img = new Image;
        img.src = zurka.imgName
        var height = img.height;
        console.log(height)
        //karta.css('padding-top', height+"px");
        grid.append(karta)
        //grid.append($('<div></div>')); 
    })

})



