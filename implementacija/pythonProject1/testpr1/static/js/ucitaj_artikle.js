
var artikliUNedostatku = [
    {
        idproduct :"123213",
        name: 'Amstel',
        amount  : '10',
        minamount : '10',
        productcode : '2123232323232',
        marketprice : '140',
        suppliercode : '1231231232131'

    },{
        idproduct :"123213",
        name: 'Amstel',
        amount  : '10',
        minamount : '10',
        productcode : '2123232323232',
        marketprice : '140',
        suppliercode : '1231231232131'

    },
    {
        idproduct :"123213",
        name: 'Amstel',
        amount  : '10',
        minamount : '10',
        productcode : '2123232323232',
        marketprice : '140',
        suppliercode : '1231231232131'

    },
]


var artikli =[
    {idproduct :"123213",
        name: 'Lasko',
        amount  : '10',
        minamount : '10',
        productcode : '2123232323232',
        marketprice : '140',
        suppliercode : '1231231232131'

    },
]
var modalCreateOpen = false
var modalDeleteOpen= false
var modalPorudzbeniceOpen= false
var ignoreDoc=false
var artikalCreateInputs = ["#naziv-input","#tren-kolicina-input","#nabavna-cena-input","#manjak-kolicina-input"]
$(document).ready(async function (){
    popuniSidebar("admin")
    // artikliUNedostatku =  await $.get("apiDeficientProduct") //AJAX
    // artikli = await $.get("apiProduct") //AJAX
    // let grid1 = $('#porudzbenice-grid')
    // let grid2 = $('#artikli-grid')
    // popuni(grid1,artikliUNedostatku)
    // popuni(grid2,artikli)
    // popuniModalPorudzbenice(artikliUNedostatku)
    refresh()

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
    $("#kreiraj-porudzbenicu").on('click',createPorudzbenica)

    checkIfFilled(artikalCreateInputs,$("#sacuvaj-artikal"))
    for(let input of artikalCreateInputs){
        $(input).on('input',()=>{checkIfFilled(artikalCreateInputs,$("#sacuvaj-artikal"))})
    }
    $("#sacuvaj-artikal").on('click',sacuvajArtikal)
    $("#del-button-confirm").on('click',obirsiArtikal)
})
function openDeleteModal(placeholder){
    
    modalDeleteOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','inline-block')
    $('#modal-del-input').attr('placeholder',placeholder)
    $("#modal-del-input").on('input',checkIfMathcing)
    $('#id').text(placeholder)
    checkIfMathcing()


}
function checkIfFilled(inputs,button){
    console.log("check")
    for(let input of inputs){
        console.log(input+" val "+ $(input).val())
        if($(input).val()=="" || $(input).val()==undefined || $(input).val()==null){
            button.prop('disabled', true);
            console.log("check1")
            return false
        }
    }
    button.prop('disabled', false);
    
    return true
}

function openCreateModal(info){
    fillCreateModal(info)
    resetErrors()
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
            idproduct :"",
               name: '',
               amount  : '',
               productcode : '',
                marketprice : '',
                suppliercode : '',
                minamount : '',
        }
    }else{
        $('#naslov-modala').text("Izmena artikla")
    }
    $("#artikal-id-modal").text(info.idproduct);
    $('#naziv-input').attr('value',info.name);
    $('#sifra-artikla-input').attr('value',info.productcode );
    $('#sifra-dobavljaca-input').attr('value',info.suppliercode );
    $('#tren-kolicina-input').attr('value',info.amount );
    $('#nabavna-cena-input').attr('value',info.marketprice );
    $('#manjak-kolicina-input').attr('value',info.minamount );
}

function checkIfMathcing(){
    if($('#modal-del-input').val()==$('#id').text()){
        console.log("poklapa se")
        $("#del-button-confirm").prop('disabled', false);
    }else{
        console.log("ne poklapa se")
        $("#del-button-confirm").prop('disabled', true);
    }
    return $('#modal-del-input').val()==$('#id').text()
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
    grid.empty()
    podaci.forEach((artikal)=>{
        let karta = $('<div></div>').addClass('card-single');
        let naslovniDiv = $('<div></div>').addClass('naslov')
        let naslov = $('<h1></h1>').append(artikal.name)
        let buttonsDiv = $('<div></div>').addClass('buttons')
        let buttonChange = $('<button class="sm-button modal-btn"><span class="las la-exchange-alt"></span></button>')
        let buttonDelete = $('<button class="sm-button modal-btn-del"><span class="las la-times"></span></button>')
        buttonDelete.on('click',()=>{openDeleteModal(artikal.idproduct )})
        buttonChange.on('click',()=>{openCreateModal(artikal)})
        buttonsDiv.append(buttonChange)
        buttonsDiv.append(buttonDelete)
        naslovniDiv.append(naslov)
        naslovniDiv.append(buttonsDiv)
        let table = $('<table></table>')
        table.append($('<tr></tr>').append($('<td></td>').append('Kolicina')).append($('<td></td>').append(artikal.amount )))
        table.append($('<tr></tr>').append($('<td></td>').append('Sifra')).append($('<td></td>').append(artikal.productcode )))
        table.append($('<tr></tr>').append($('<td></td>').append('Nabavna cena')).append($('<td></td>').append(artikal.marketprice +" RSD")))
        table.append($('<tr></tr>').append($('<td></td>').append('Sifra dobavljaca')).append($('<td></td>').append(artikal.suppliercode )))
        karta.append(naslovniDiv)
        karta.append(table)
        grid.append(karta)
    })

}
function resetErrors(){
    $('naziv-err').text("")
    $('tren-kolicina-err').text("")
    $('manjak-kolicina-err').text("")
}
async function sacuvajArtikal(){
    let id = $("#artikal-id-modal").text()
    if(id=="")id=-1;
    let nameA = $('#naziv-input').val()
    let sifA = $('#sifra-artikla-input').val()
    let sifD = $('#sifra-dobavljaca-input').val()
    let trenKolicina = $('#tren-kolicina-input').val()
    let cena = $('#nabavna-cena-input').val()
    let kolicinaManjak = $('#manjak-kolicina-input').val()

    let noviArtikal = {
            idproduct : parseInt(id),
            name: nameA,
            amount  : parseInt(trenKolicina),
            minamount: parseInt(kolicinaManjak),
            productcode : parseInt(sifA),
            marketprice : parseInt(cena),
            suppliercode : parseInt(sifD)
    
    }
    console.log(noviArtikal)
    setSpinner()
    closeModal()
    await postData("apiSetProduct", noviArtikal)
    resetSpinner()
    refresh()
    // $.post(host+"/apiSetProduct", noviArtikal) //AJAX
}
async function obirsiArtikal(){
    let id = $("#id")
    setSpinner()
    closeModal()
    await postData("apiSetProduct", {idproduct:id})
    resetSpinner()
}

function save(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}
var porudzbenica_inputs = []
async function refresh(){

    artikliUNedostatku =  await $.get("apiDeficientProduct") //AJAX
    artikli = await $.get("apiProduct") //AJAX
    let grid1 = $('#porudzbenice-grid')
    let grid2 = $('#artikli-grid')
    popuni(grid1,artikliUNedostatku)
    popuni(grid2,artikli)
    popuniModalPorudzbenice(artikliUNedostatku)
}

function createPorudzbenica(){
    let tekst=""
    for(let i =0; i < artikliUNedostatku.length;i++){
        tekst+=artikliUNedostatku[i].name+" "+parseInt(porudzbenica_inputs[i].val())+"\n"
    }
    tekst+= "Ukupna cena porudzbine je " + pordzbenicaPrice()
    closeModal()
    save("porudzbenice.txt",tekst)
}
function pordzbenicaPrice(){
    let price=0;
    for(let i =0; i < artikliUNedostatku.length;i++){
        console.log(parseInt(artikliUNedostatku[i].marketprice))
        console.log(parseInt(porudzbenica_inputs[i].val()))
        price+= parseInt(artikliUNedostatku[i].marketprice)*parseInt(porudzbenica_inputs[i].val())
    }
    return price;
}

function popuniModalPorudzbenice(podaci){
    $('#telo-tabela-artikala').empty()
    podaci.forEach((artikal)=>{
        let red= $('<tr></tr>')
        red.append($('<td>'+artikal.name+'</td>'))
        red.append($('<td>'+artikal.amount +'</td>'))
        let input = $('<input type="number" min="0" value="0">')
        porudzbenica_inputs.push(input)
        input.on('input',()=>{
            $('#ukupna-cena-porudzbenice').text(pordzbenicaPrice())
        })
        red.append($('<td></td>').append(input)) 
        $('#telo-tabela-artikala').append(red)
    })
}
