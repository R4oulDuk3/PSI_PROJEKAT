let kategorije = [
    {
        naziv : "Kategorija",
        stavke:[
            {
                idmeni:"123",
                meniproduct:"Amstel",
                price:"180",
                akcija: "60"
            },
            {
                idmeni:"125",
                meniproduct:"Amstel",
                price:"180",
                akcija: "60"
            },
            {
                idmeni:"124",
                meniproduct:"Amstel",
                price:"180",
                akcija: "60"
            },
        ]
    },
    {

        naziv : "Kategorija",
        stavke:[
            {
                idmeni:"126",
                meniproduct:"Amstel",
                price:"180",
                akcija: "60"
            },
            {
                idmeni:"127",
                meniproduct:"Amstel",
                price:"180",
                akcija: "60"
            },

        ]
    },
]
var modalCreateOpen = false
var modalDeleteOpen= false
var modalKategorijaChangeOpen=false
var ignoreDoc=false
var delType=""
var kategorijaId=""
var stavkaAlt=null
var createType=''
var delInputs = ["#modal-del-input"]
var createStavkaInputs = ["#create-modal-naziv-input","#create-modal-cena-input","#create-modal-procenat-input"]
var createKategorijaInputs = ["#naziv-kategorije-input"]
$(document).ready(async function (){
    popuniSidebar("admin")
    refresh()
    $('#modal-create-btn').on('click',(openCreateModal))
    $("#close-del").on('click',closeModal)
    $("#close-create").on('click',closeModal)
    $("#close-kat-change").on('click',closeModal)
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
        if(modalKategorijaChangeOpen && !$target.closest('#kat-change-modal-content').length) {
            console.log('closing')
          $('#kat-change-modal').css('display','none')
          modalKategorijaChangeOpen=false;
        }
                  
      });
    for(let input of delInputs){
        $(input).on('input',()=>{checkIfFilled(delInputs,$("#del-button"))})
    }
    for(let input of createStavkaInputs){
        $(input).on('input',()=>{checkIfFilled(createStavkaInputs,$("#kreiraj-stavku"))})
    }
    // checkIfFilled(createKategorijaInputs,$("#dodaj-kategoriju"))
    // $("#naziv-kategorije-input").on('input',()=>{
    //     checkIfFilled(createKategorijaInputs,$("#dodaj-kategoriju"))
    //     }
    // )
    $('#del-button').on('click',obrisi)
    $('#kreiraj-stavku').on('click',createStavka)
    $('#dodaj-kategoriju').on('click',createKategorija)
    $('#azuriraj').on('click',azuriraj)
    $("#create-modal-procenat-input").on('input',popustOnInput)
    $("#dodaj-kategoriju").prop('disabled', true);
    $("#naziv-kategorije-input").on('input',()=>{
        checkIfEmptyOrExists($("#naziv-kategorije-input"),$("#dodaj-kategoriju"))
        console.log("input")
    })
    $('#kat-change-modal-input').on('input',()=>{
        checkIfEmptyOrExists($('#kat-change-modal-input'),$("#change-kat-name"))
    })
    $("#change-kat-name").prop('disabled', true);
    $("#dodaj-kategoriju").prop('disabled', true);
})
function checkIfEmptyOrExists(input,button){
    if(input.val()==""){
            button.prop('disabled', true);
            return;
        }
        let kategorija = findElementByKey(kategorije,"naziv",input.val())
        if(kategorija==null){
            button.prop('disabled', false);
        }else{
            button.prop('disabled', true);
        }
}


function findElementByKey(arr,key,id){
    for(let elem of arr){
        if(elem[key]==id)return elem;
    }
    return null;
}
async function refresh(){
    let grid = $('.grid').first();
    kategorije = await $.get("apiMeni") //AJAX
    console.log(kategorije)
    kategorije.sort(function(a, b) {
    return a.naziv >b.naziv;
    });
    for(let kategorija of kategorije){
        kategorija.stavke.sort(
            function(a, b) {
                return a.meniproduct >b.meniproduct;
            }
        )
    }
    popuni(grid,kategorije)

}

function popuni(grid,data){
    let cnt=0;
    grid.empty()
    console.log("popunjavanje")
    data.forEach((kategorija)=>{
        kat_div = $('<div class="kategorija"></div>')
        card = $('<div class="card"></div>')
        card_header = $('<div class="card-header"></div>')
        buttonsDiv = $('<div class="buttons"></div>')
        changeButton = $('<button class="sm-button modal-btn-del"><span class="las la-exchange-alt"></span></button>')
        delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        hideButton = $('<button class="sm-button"> <span class="las la-sort-down"></span></button>')
        
        delButton.on('click',()=>{openDeleteModal(kategorija.naziv)})
        changeButton.on('click',()=>{
            kategorijaId = kategorija.naziv
            openKategorijaChangeModal(kategorija.naziv)
        })
        let txt='#kategorija-card-body-'+cnt
        hideButton.on('click',()=>{
            
            console.log(txt)
            $(txt).toggle(500)
        })

        buttonsDiv.append(changeButton)
        buttonsDiv.append(delButton)
        buttonsDiv.append(hideButton)
        
        naslov = $('<h2></h2>').text(kategorija.naziv)
        card_header.append(naslov).append(buttonsDiv)

        card_body = $('<div class="card-body" id="kategorija-card-body-'+cnt+'"></div>')
        cnt++;
        table_div = $('<div class="table-responsive"></div>')
        table = $('<table></table>')
        table_head = $('<thead><tr><td>Naziv stavke</td><td>Cena stavke</td><td colspan="2">Akcija</td></tr></thead>')
        table_body= $('<tbody></tbody>')
        kategorija.stavke.forEach((stavka)=>{
            red= $('<tr></tr>')
            naziv = $('<td>'+stavka.meniproduct+'</td>')
            cena = $('<td>'+stavka.price+' RSD</td>')
            akcija=null
            if(stavka.akcija==0)akcija = $('<td>Nema akcije</td>')
            else akcija = $('<td>'+stavka.akcija+' %</td>')
            let s_buttonsTd = $('<td></td>')
            let s_buttonsDiv = $('<div></div>')
            let s_changeButton = $('<button class="sm-button"><span class="las la-exchange-alt"></span></button>')
            let s_delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
            
            s_changeButton.on('click',()=>{
                createType='change'
                stavkaAlt= stavka
                openCreateModal(stavka)
            })
            s_delButton.on('click',()=>{
                delType="stavka"
                kategorijaId = kategorija.naziv
                stavkaAlt = stavka

                obrisi()
            })

            s_buttonsDiv.append(s_changeButton).append(s_delButton)
            s_buttonsTd.append(s_buttonsDiv)
            red.append(naziv).append(cena).append(akcija).append(s_buttonsTd)
            table_body.append(red)
        })
        bottomButtonsDiv = $('<div class="buttons"></div>')
        buttonAdd = $('<div class="h-button modal-btn"><a href="#">Dodaj stavku</a></div>')
        buttonAzuriraj = $('<div class="h-button"><a href="#">Azuriraj stranicu</a></div>')
        
        buttonAdd.on('click',()=>{
            createType='create'
            kategorijaId=kategorija.naziv
            openCreateModal(null)}
            )

        bottomButtonsDiv.append(buttonAdd)//.append(buttonAzuriraj)

        table.append(table_head).append(table_body)
        table_div.append(table)
        card_body.append(table_div).append(bottomButtonsDiv)
        card.append(card_header).append(card_body) 
        kat_div.append(card)
        delButton.on('click',()=>{
            delType="kategorija"
            kategorijaId=kategorija.naziv
            openDeleteModal(kategorija.naziv)
        })
        
        grid.append(kat_div)
    })
}
function popustOnInput(){
    let val =parseInt($("#create-modal-procenat-input").val())
    if(val<0){
        $("#create-modal-procenat-input").val(0)
    }if(val>100){
        $("#create-modal-procenat-input").val(100)
    }
}
function openDeleteModal(placeholder){
    modalDeleteOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','inline-block')
    $('#modal-del-input').attr('placeholder',placeholder)
    $('#id').text(placeholder)
    checkIfFilled(delInputs,$("#del-button"))
}

function checkIfFilled(inputs,button){
    console.log("check")
    for(let input of inputs){
        console.log(input+" val "+ $(input).val())
        if($(input).val()=="" || $(input).val()==undefined){
            button.prop('disabled', true);
            console.log("check1")
            return false
        }
    }
    button.prop('disabled', false);
    
    return true
}
function createKategorija(){
    let nazivK = $('#naziv-kategorije-input').val()
    kategorije.push(
        {
            naziv: nazivK,
            stavke: []    
        }
    )
    popuni($('.grid').first(),kategorije)

}
function kategorijaByID(){
    for(let kategorija of kategorije){
        if(kategorija.naziv==kategorijaId){
            return kategorija
        }
    }
}

function obrisi(){
    console.log("check")
    if(delType=="stavka"){
        let kat =kategorijaByID()
        
        for(stavka of kat.stavke){

            if(stavka.idmeni ==stavkaAlt.idmeni ){
                console.log("removed")
                removeElemFromArray(stavka,kat.stavke)
                break
            }
        }
        console.log(kategorije)

    }else{
        let kat =kategorijaByID()
        console.log(kat)
        removeElemFromArray(kat,kategorije)
    }
    popuni($('.grid').first(),kategorije)
    closeModal()
}
function removeElemFromArray(elem,array){
    const index = array.indexOf(elem);
    if (index > -1) {
        console.log("removed")
    array.splice(index, 1); // 2nd parameter means remove one item only
}
}
function openCreateModal(info){
    fillCreateModal(info)
    modalCreateOpen=true
    ignoreDoc=true
    $('#create-modal').css('display','inline-block')
    checkIfFilled(createStavkaInputs,$("#kreiraj-stavku"))
}
function openKategorijaChangeModal(naziv){
    
    modalKategorijaChangeOpen=true
    ignoreDoc=true
    $('#kat-change-modal-input').val(naziv)
    $('#kat-change-modal').css('display','inline-block')
}

function fillCreateModal(info){
    if(info==null){
        $('#create-modal-naslov').text("Kreiranje stavke")
        info ={
            meniproduct:"",
            price:"",
            akcija: ""
        }
    }else{
        $('#create-modal-naslov').text("Izmena stavke")
    }
    $("#create-modal-naziv-input").val(info.meniproduct)
    $("#create-modal-cena-input").val(info.price)
    $("#create-modal-procenat-input").val(info.akcija)

    
}

async function azuriraj(){
    console.log("kategorije")
    //TODO $.post(kategorije)
    setSpinner()
    closeModal()
    console.log(kategorije)
    await postData("apiMeniAdd", {kukuruz : JSON.stringify(kategorije)}) //AJAX POST
    console.log("pozvano")
    refresh()
    resetSpinner()
    
}

function createStavka(){

    let nazivS = $("#create-modal-naziv-input").val()
    let cenaS = $("#create-modal-cena-input").val()
    let procenatS = $("#create-modal-procenat-input").val()
    if(createType=='change'){
        stavkaAlt.meniproduct=nazivS
        stavkaAlt.price=cenaS
        stavkaAlt.akcija=procenatS
    }else{
    kategorijaByID().stavke.push(
        {
            meniproduct:nazivS,
            price:cenaS,
            akcija: procenatS
        }
    )
    }
    console.log(kategorije)
    closeModal()
    popuni($('.grid').first(),kategorije)

}

function closeModal(){
    console.log("close modal")
    ignoreDoc=false
    modalCreateOpen=false
    modalDeleteOpen=false
    modalKategorijaChangeOpen=false
    $('#delete-modal').css('display','none')
    $('#create-modal').css('display','none')
    $('#kat-change-modal').css('display','none')
}