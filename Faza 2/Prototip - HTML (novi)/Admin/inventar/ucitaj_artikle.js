
var artikliUNedostatku = [
    {
        name: 'Amstel',
        kolicina : '10',

        sifraProizvoda: '2123232323232',
        nabavnaCena: '140',
        sifraDobavljaca: '1231231232131'

    },{
        name: 'Amstel',
        kolicina : '10',

        sifraProizvoda: '2123232323232',
        nabavnaCena: '140',
        sifraDobavljaca: '1231231232131'

    },
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
var modalCreateOpen = false
var modalDeleteOpen= false
var modalPorudzbeniceOpen= false
var ignoreDoc=false

$(document).ready(function (){
        
    let grid1 = $('#porudzbenice-grid')
    let grid2 = $('#artikli-grid')
    popuni(grid1,artikliUNedostatku)
    popuni(grid2,artikli)
    popuniModalPorudzbenice(artikliUNedostatku)

    $(document).click(function(event) { 
        console.log('close')
        if(ignoreDoc){
            ignoreDoc=false;
            return
        }
        var $target = $(event.target);
        if(modalCreateOpen && !$target.closest('#create-modal-content').length) {
            console.log('closing')
          $('#create-modal').css('display','none')
            modalCreateOpen=false;
        }
        if(modalDeleteOpen && !$target.closest('#delete-modal-content').length) {
            console.log('closing')
          $('#delete-modal').css('display','none')
            modalDeleteOpen=false;
        }
        if(modalPorudzbeniceOpen && !$target.closest('#porudzbenice-modal-content').length) {
            console.log('closing')
          $('#porudzbenice-modal').css('display','none')
            modalDeleteOpen=false;
        }              
      });
    $("#close-del").on('click',closeModal)
    $("#close-create").on('click',closeModal)
    $("#modal-create-btn").on('click',()=>{openCreateModal(null)})
    $("#close-porudzbenice").on('click',closeModal)
    $("#modal-porudzbenice-btn").on('click',openPorudzbeniceModal)
})
function openDeleteModal(placeholder){
    modalDeleteOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','inline-block')
    $('#modal-del-input').attr('placeholder',placeholder)
}
function openCreateModal(info){
    fillCreateModal(info)
    modalCreateOpen=true
    ignoreDoc=true
    $('#create-modal').css('display','inline-block')
}
function openPorudzbeniceModal(info){
    modalPorudzbeniceOpen=true
    ignoreDoc=true
    $('#porudzbenice-modal').css('display','inline-block')
}
function fillCreateModal(info){
    console.log(info)
    if(info==null){
        $('#naslov-modala').text("Kreiranje artikla")
        info={
               name: '',
                kolicina : '',
                sifraProizvoda: '',
                nabavnaCena: '',
                sifraDobavljaca: ''
        }
    }else{
        $('#naslov-modala').text("Izmena artikla")
    }
    $('#naziv-input').attr('value',info.name);
    $('#sifra-artikla-input').attr('value',info.sifraProizvoda);
    $('#sifra-dobavljaca-input').attr('value',info.sifraDobavljaca);
    $('#tren-kolicina-input').attr('value',info.kolicina);
    $('#nabavna-cena-input').attr('value',info.nabavnaCena);
}
//TODO: regulisi sirinu
function closeModal(){
    console.log("close modal")
    ignoreDoc=false
    modalCreateOpen=false
    modalDeleteOpen=false
    modalPorudzbeniceOpen=false
    $('#delete-modal').css('display','none')
    $('#create-modal').css('display','none')
    $('#porudzbenice-modal').css('display','none')
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
        buttonDelete.on('click',()=>{openDeleteModal(artikal.name)})
        buttonChange.on('click',()=>{openCreateModal(artikal)})
        buttonsDiv.append(buttonChange)
        buttonsDiv.append(buttonDelete)
        naslovniDiv.append(naslov)
        naslovniDiv.append(buttonsDiv)
        let table = $('<table></table>')
        table.append($('<tr></tr>').append($('<td></td>').append('Kolicina')).append($('<td></td>').append(artikal.kolicina)))
        table.append($('<tr></tr>').append($('<td></td>').append('Sifra')).append($('<td></td>').append(artikal.sifraProizvoda)))
        table.append($('<tr></tr>').append($('<td></td>').append('Nabavna cena')).append($('<td></td>').append(artikal.nabavnaCena+" RSD")))
        table.append($('<tr></tr>').append($('<td></td>').append('Sifra dobavljaca')).append($('<td></td>').append(artikal.sifraDobavljaca)))
        karta.append(naslovniDiv)
        karta.append(table)
        grid.append(karta)
    })

}
function popuniModalPorudzbenice(podaci){
    podaci.forEach((artikal)=>{
        let red= $('<tr></tr>')
        red.append($('<td>'+artikal.name+'</td>'))
        red.append($('<td>'+artikal.kolicina+'</td>'))
        red.append($('<td><input type="text"></td>')) 
        $('#telo-tabela-artikala').append(red)
    })
}