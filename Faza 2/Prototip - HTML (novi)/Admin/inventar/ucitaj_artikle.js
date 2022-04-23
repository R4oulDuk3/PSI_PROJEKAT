
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
        name: 'Lasko',
        kolicina : '10',

        sifraProizvoda: '2123232323232',
        nabavnaCena: '140',
        sifraDobavljaca: '1231231232131'

    },
]
var modalOpen = false
var ignoreDoc=false

$(document).ready(function (){
        
    let grid1 = $('#porudzbenice-grid')
    let grid2 = $('#artikli-grid')
    popuni(grid1,artikliUNedostatku)
    popuni(grid2,artikli)
    $(document).click(function(event) { 
        console.log('close')
        if(ignoreDoc){
            ignoreDoc=false;
            return
        }
        console.log(modalOpen)
        var $target = $(event.target);
        if(modalOpen && !$target.closest('#delete-modal-content').length) {
            console.log('closing')
          $('#delete-modal').css('display','none')
            modalOpen=false;
        }        
      });


    const modal_del = document.querySelector('#delete-modal');
    document.querySelectorAll('.modal-btn-del').forEach(item => {
        item.addEventListener('click', ()=>{

        });
    });
})
function openModal(placeholder){
    modalOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','block')
    $('#modal-del-input').attr('placeholder',placeholder)
}
function closeModal(){
    $('modal').each(()=>{
        this.css('display','none')
    })
}

// dodati da se na window klik svi modali zatvore
function popuni(grid,podaci){
    console.log("check")
    podaci.forEach((artikal)=>{
        let karta = $('<div></div>').addClass('card-single');
        let naslovniDiv = $('<div></div>').addClass('naslov')
        let naslov = $('<h1></h1>').append(artikal.name)
        let buttonsDiv = $('<div></div>').addClass('buttons')
        let buttonChange = $('<button class="sm-button modal-btn"><span class="las la-exchange-alt"></span></button>')
        let buttonDelete = $('<button class="sm-button modal-btn-del"><span class="las la-times"></span></button>')
        buttonDelete.on('click',()=>{openModal(artikal.name)})
        buttonsDiv.append(buttonChange)
        buttonsDiv.append(buttonDelete)
        naslovniDiv.append(naslov)
        naslovniDiv.append(buttonsDiv)
        let table = $('<table></table>')
        table.append($('<tr></tr>').append($('<td></td>').append('Kolicina')).append($('<td></td>').append(artikal.kolicina)))
        table.append($('<tr></tr>').append($('<td></td>').append('Sifra')).append($('<td></td>').append(artikal.sifra)))
        table.append($('<tr></tr>').append($('<td></td>').append('Nabavna cena')).append($('<td></td>').append(artikal.nabavnaCena+" RSD")))
        table.append($('<tr></tr>').append($('<td></td>').append('Sifra dobavljaca')).append($('<td></td>').append(artikal.sifraDobavljaca)))
        karta.append(naslovniDiv)
        karta.append(table)
        grid.append(karta)
    })
}