import {uploadImage,downloadImage} from "../index.js"
let konobari = [
    {   idusers :"1",
        name : "Marko Savic",
        telefon: '+38162626262',
        email: 'marko-savic@gmail.com',
        korisnickoIme: 'mareSavke',
        imagePath:'../assets/konobar.jpg'
    },
    {   idusers :"2",
        name : "Nevenka Nevenkic",
        telefon: '+38162626262',
        email : 'nevenkaNevenkic@gmail.com',
        korisnickoIme: 'nenaNena',
        imagePath:'../assets/konobarka.webp'
    }
]
var modalCreateOpen = false
var modalDeleteOpen= false
var ignoreDoc=false
var file=null
$(document).ready(function (){
    popuniSidebar("admin")
    let grid = $('.grid').first();
    popuni(grid,konobari)
    
    $('#modal-create-btn').on('click',(openCreateModal))
    $("#close-del").on('click',closeModal)
    $("#close-create").on('click',closeModal)
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
      });
    $("#image_input").on('change',chooseFile)
    $('#modal-del-input').on('input',checkIfMathcing)
    $('#del-btn-potvrdi').on('click',deleteKonobar)
})

function popuni(grid,data){
    grid.empty()
    data.forEach((konobar)=>{
        let card = $('<div class="card"></div>')
        card.css('background-image','url('+konobar.imagePath+')')
        let content = $('<div class="card-content"></div>')
        let buttonsDiv = $('<div class="buttons"></div>')
        let delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        let naslov = $('<h2 class="card-title"></h2>').text(konobar.name )
        let tekst = $('<p class="card-body">Telefon: '+konobar.telefon+"<br>email: "+ konobar.email +'</p>')
        delButton.on('click',()=>{
            openDeleteModal(konobar.idusers )
        })
        buttonsDiv.append(delButton)
        content.append(buttonsDiv)
        content.append(naslov)
        content.append(tekst)
        card.append(content)
        grid.append(card)
    })
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

function openDeleteModal(placeholder){
    modalDeleteOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','inline-block')
    $('#modal-del-input').attr('placeholder',placeholder)
    $('#id').text(placeholder)
    checkIfMathcing()
}
function openCreateModal(){
    modalCreateOpen=true
    ignoreDoc=true
    file=null
    $('#create-modal').css('display','inline-block')
    
}

function chooseFile(e){
    file=e.target.files[0]
    console.log(file)
}
function deleteKonobar(){
    if(checkIfMathcing()){
        let idK = $('#id').val()
        $.post(host+"/apiDeleteWaiters",{id:idK})
        //TO DO DELETE
    }
}
function kreiranjeKonobara(){
    naziv = $('naziv-input').val()
    kime = $('kime-input').val()
    mail = $('mail-input').val()
    telefonA = $('mail-input').val()
    lozinka = $('lozinka1-input').val()
    lozinka2 = $('lozinka2-input').val()
    if(lozinka!=lozinka2){
        alert("Lozinke se ne poklapaju")
        return
    }
    //TO DO SLANJE
    let konobar =     {   
        name : naziv,
        telefon: telefon,
        email : mail,
        korisnickoIme: kime,
        imagePath:'../assets/konobarka.webp',
        password:lozinka
    }
    // $.post(host+"/apiCreateWaiter",konobar) //AJAX
}
function closeModal(){
    console.log("close modal")
    ignoreDoc=false
    modalCreateOpen=false
    modalDeleteOpen=false
    $('#delete-modal').css('display','none')
    $('#create-modal').css('display','none')
}