
var artikliUNedostatku = [
    {
        name: 'Amstel',
        kolicina : '10',

        sifraProizvoda: '2123232323232',
        nabavnaCena: '140',
        sifraDobavljaca: '1231231232131'

    },
]
var artikli =[
    {
        name: 'Amstel',
        kolicina : '10',

        sifraProizvoda: '2123232323232',
        nabavnaCena: '140',
        sifraDobavljaca: '1231231232131'

    },
]


$(document).ready(function (){
    let grid1 = $('#porudzbenice-grid')
    let grid2 = $('#artikli-grid')
    
    function popuni(grid,podaci){
        podaci.forEach((artikal)=>{
            
        })
    }
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



