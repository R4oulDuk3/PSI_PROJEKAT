let postavke = [
    {
        id:"123",
        naziv : "Postavka",
        stolovi:[
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            
        ]
    },
    {
        naziv : "Postavka",
        id: "123",
        stolovi:[
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            {
                id:"123",
                naziv:"Separe",
                brojOsoba: "8"
            },
            
        ]
    },
]
var deleteType=""
var postavkaId=""
var modalCreateOpen = false
var modalDeleteOpen= false
var modalKategorijaChangeOpen=false
var ignoreDoc=false
$(document).ready(function (){
    let grid = $('.grid').first();
    popuni(grid,postavke)
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
      $('del-button-confirm').on('click',deleteStolovi)
})

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

function popuni(grid,data){
    data.forEach((postavka)=>{
        kat_div = $('<div class="postavka"></div>')
        card = $('<div class="card"></div>')
        card_header = $('<div class="card-header"></div>')
        buttonsDiv = $('<div class="buttons"></div>')
        changeButton = $('<button class="sm-button modal-btn-del"><span class="las la-exchange-alt"></span></button>')
        delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        
        delButton.on('click',()=>{openDeleteModal(postavka.naziv)})
        changeButton.on('click',()=>{openKategorijaChangeModal(postavka.naziv)})
        
        buttonsDiv.append(changeButton)
        buttonsDiv.append(delButton)
        
        naslov = $('<h2></h2>').text(postavka.naziv)
        card_header.append(naslov).append(buttonsDiv)

        card_body = $('<div class="card-body"></div>')
        table_div = $('<div class="table-responsive"></div>')
        table = $('<table></table>')
        table_head = $('<thead><tr><td>Naziv stola</td><td colspan="2">Broj osoba</td></tr></thead>')
        table_body= $('<tbody></tbody>')
        postavka.stolovi.forEach((sto)=>{
            red= $('<tr></tr>')
            naziv = $('<td>'+sto.naziv+'</td>')
            brojOsoba = $('<td>'+sto.brojOsoba+'</td>')
            let s_buttonsTd = $('<td></td>')
            let s_buttonsDiv = $('<div></div>')
            let s_delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')

            s_delButton.on('click',()=>{
                openDeleteModal(sto.id)
                deleteType ="sto"
            })

            s_buttonsDiv.append(s_delButton)
            s_buttonsTd.append(s_buttonsDiv)
            red.append(naziv).append(brojOsoba).append(s_buttonsTd)
            table_body.append(red)
        })
        bottomButtonsDiv = $('<div class="buttons"></div>')
        buttonAdd = $('<div class="button modal-btn margin"><a href="#">Dodaj sto</a></div>')
        
        buttonAdd.on('click',()=>{
            postavkaId = postavka.id
            openCreateModal(null)}
            )

        bottomButtonsDiv.append(buttonAdd)

        table.append(table_head).append(table_body)
        table_div.append(table)
        card_body.append(table_div).append(bottomButtonsDiv)
        card.append(card_header).append(card_body) 
        kat_div.append(card)
        delButton.on('click',()=>{
            openDeleteModal(postavka.id)
            deleteType = "postavka"
        })
        
        grid.append(kat_div)
    })
}
function deleteStolovi(){
    if(checkIfMathcing()){
        let id =$('#id').text()
        if(deleteType=="postavka"){

        }else{

        }
    }
}
function createSto(){

    if($('#sto-naziv-input').val()==""){
        $('#naziv-err').text("Naziv mora biti popunjen")
    }else{
        let posId= postavkaId
        let name = $('#sto-naziv-input').val()
        let num = $('#broj-osoba-input').val()
    }
}
function resetErrors(){
    $('naziv-err').text("")
}

function openDeleteModal(placeholder){
    modalDeleteOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','inline-block')
    $('#modal-del-input').attr('placeholder',placeholder)
    $('#id').text(placeholder)
    checkIfMathcing()
    $('#modal-del-input').on('input',checkIfMathcing)
    
}
function openCreateModal(info){
    fillCreateModal(info)
    modalCreateOpen=true
    ignoreDoc=true
    $('#create-modal').css('display','inline-block')
    resetErrors()
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