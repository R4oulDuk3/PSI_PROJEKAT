let kategorije = [
    {   id:"123",
        naziv : "Kategorija",
        stavke:[
            {
                id:"123",
                naziv:"Amstel",
                cena:"180",
                akcija: "60"
            },
            {
                id:"125",
                naziv:"Amstel",
                cena:"180",
                akcija: "60"
            },
            {
                id:"124",
                naziv:"Amstel",
                cena:"180",
                akcija: "60"
            },
        ]
    },
    {
        id:"124",
        naziv : "Kategorija",
        stavke:[
            {
                id:"126",
                naziv:"Amstel",
                cena:"180",
                akcija: "60"
            },
            {
                id:"127",
                naziv:"Amstel",
                cena:"180",
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
var stavkaDel=null
var delInputs = ["#modal-del-input"]
var createStavkaInputs = ["#create-modal-naziv-input","#create-modal-cena-input","#create-modal-procenat-input"]
$(document).ready(function (){
    let grid = $('.grid').first();
    popuni(grid,kategorije)
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
    $('#del-button').on('click',obrisi)
    $('#kreiraj-stavku').on('click',createStavka)

})

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
        changeButton.on('click',()=>{openKategorijaChangeModal(kategorija.naziv)})
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
            naziv = $('<td>'+stavka.naziv+'</td>')
            cena = $('<td>'+stavka.cena+' RSD</td>')
            akcija=null
            if(stavka.akcija==0)akcija = $('<td>Nema akcije</td>')
            else akcija = $('<td>'+stavka.akcija+' %</td>')
            let s_buttonsTd = $('<td></td>')
            let s_buttonsDiv = $('<div></div>')
            let s_changeButton = $('<button class="sm-button"><span class="las la-exchange-alt"></span></button>')
            let s_delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
            
            s_changeButton.on('click',()=>{
                openCreateModal(stavka)
            })
            s_delButton.on('click',()=>{
                delType="stavka"
                kategorijaId = kategorija.id
                stavkaDel = stavka
                //openDeleteModal(stavka.id)
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
            kategorijaId=kategorija.id
            openCreateModal(null)}
            )

        bottomButtonsDiv.append(buttonAdd).append(buttonAzuriraj)

        table.append(table_head).append(table_body)
        table_div.append(table)
        card_body.append(table_div).append(bottomButtonsDiv)
        card.append(card_header).append(card_body) 
        kat_div.append(card)
        delButton.on('click',()=>{
            delType="kategorija"
            kategorijaId=kategorija.id
            openDeleteModal(kategorija.id)
        })
        
        grid.append(kat_div)
    })
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
function kategorijaByID(){
    for(let kategorija of kategorije){
        if(kategorija.id==kategorijaId){
            return kategorija
        }
    }
}

function obrisi(){
    console.log("check")
    if(delType=="stavka"){
        let kat =kategorijaByID()
        
        for(stavka of kat.stavke){
           // console.log( stavka.id +" "_ )
            if(stavka.id ==stavkaDel.id ){
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
    $('kat-change-modal-input').attr('value',naziv)
    $('#kat-change-modal').css('display','inline-block')
}

function fillCreateModal(info){
    if(info==null){
        $('#create-modal-naslov').text("Kreiranje stavke")
        info ={
            naziv:"",
            cena:"",
            akcija: ""
        }
    }else{
        $('#create-modal-naslov').text("Izmena stavke")
    }
    $("#create-modal-naziv-input").attr('value',info.naziv)
    $("#create-modal-cena-input").attr('value',info.cena)
    $("#create-modal-procenat-input").attr('value',info.akcija)

    
}
function createStavka(){

    let nazivS = $("#create-modal-naziv-input").val()
    let cenaS = $("#create-modal-cena-input").val()
    let procenatS = $("#create-modal-procenat-input").val()
    kategorijaByID().stavke.push(
        {
            naziv:nazivS,
            cena:cenaS,
            akcija: procenatS
        }
    )
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