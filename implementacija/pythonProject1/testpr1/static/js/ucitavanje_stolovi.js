let postavke = [
    {
        idsetup:"123",
        name : "Postavka",
        tables:[
            {
                id:"123",
                name:"Separe",
                noofseats: "8"
            },
            {
                id:"123",
                name:"Separe",
                noofseats: "8"
            },

            
        ]
    },
    {
        name : "Postavka",
        idsetup: "123",
        tables:[
            {
                id:"123",
                name:"Separe",
                noofseats: "8"
            },
            {
                id:"123",
                name:"Separe",
                noofseats: "8"
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
      $('#del-button-confirm').on('click',deleteStolovi)
      $("#kreiraj-sto").on('click',createSto)
      $("#dodaj-postavku").on('click',createPostavka)
})
async function refresh(){
    postavke = await $.get("apiSetup")//AJAX
    let grid = $('.grid').first();
    popuni(grid,postavke)
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
    grid.empty()
    data.forEach((postavka)=>{
        kat_div = $('<div class="postavka"></div>')
        card = $('<div class="card"></div>')
        card_header = $('<div class="card-header"></div>')
        buttonsDiv = $('<div class="buttons"></div>')
        changeButton = $('<button class="sm-button modal-btn-del"><span class="las la-exchange-alt"></span></button>')
        delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        
        delButton.on('click',()=>{openDeleteModal(postavka.name)})
        changeButton.on('click',()=>{openKategorijaChangeModal(postavka.name)})
        
        //buttonsDiv.append(changeButton) TODO ADD CHANGE
        buttonsDiv.append(delButton)
        
        naslov = $('<h2></h2>').text(postavka.name)
        card_header.append(naslov).append(buttonsDiv)

        card_body = $('<div class="card-body"></div>')
        table_div = $('<div class="table-responsive"></div>')
        table = $('<table></table>')
        table_head = $('<thead><tr><td>Naziv stola</td><td colspan="2">Broj osoba</td></tr></thead>')
        table_body= $('<tbody></tbody>')
        postavka.tables.forEach((sto)=>{
            red= $('<tr></tr>')
            naziv = $('<td>'+sto.name+'</td>')
            brojOsoba = $('<td>'+sto.noofseats+'</td>')
            let s_buttonsTd = $('<td></td>')
            let s_buttonsDiv = $('<div></div>')
            let s_delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')

            s_delButton.on('click',()=>{
                openDeleteModal(sto.idtable)
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
            postavkaId = postavka.idsetup
            openCreateModal(null)}
            )

        bottomButtonsDiv.append(buttonAdd)

        table.append(table_head).append(table_body)
        table_div.append(table)
        card_body.append(table_div).append(bottomButtonsDiv)
        card.append(card_header).append(card_body) 
        kat_div.append(card)
        delButton.on('click',()=>{
            openDeleteModal(postavka.idsetup)
            deleteType = "postavka"
        })
        
        grid.append(kat_div)
    })
}
async function postDataWithSpinner(url,data){
    closeModal()
    setSpinner()
    await postData(url,data)
    refresh()
    resetSpinner()
}

function deleteStolovi(){
    if(checkIfMathcing()){
        let id =$('#id').text()
        if(deleteType=="postavka"){
            console.log("Delete postavka")
            postDataWithSpinner("apiDeleteSetup",{idsetup:id}) //AJAX
        }else{
            console.log("Delete sto")
            postDataWithSpinner("apiDeleteTable",{idtable:id}) //AJAX
        }
    }
}
async function createSto(){

    if($('#sto-naziv-input').val()==""){
        $('#naziv-err').text("Naziv mora biti popunjen")
    }else{
        let posId= postavkaId
        let nameS = $('#sto-naziv-input').val()
        let num = $('#broj-osoba-input').val()
        let sto = {
            idsetup:posId,
            name:nameS,
            noofseats:num
        }
        postDataWithSpinner("apiCreateTables",sto)
    }
}
async function createPostavka(){
    let naziv =$("#naziv-nove-postavke").val()
    if(naziv=="")return 
    postDataWithSpinner("apiCreateSetup",{name:naziv})//AJAX
    
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