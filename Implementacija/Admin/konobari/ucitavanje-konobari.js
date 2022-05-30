import {uploadImage,downloadImage} from "../index.js"
let konobari = [
    {   idusers :"1",
        name : "Marko",
        surname : "Savic",
        telefon: '+38162626262',
        email: 'marko-savic@gmail.com',
        korisnickoIme: 'mareSavke',
        imagePath:'../assets/konobar.jpg'
    },
    {   idusers :"2",
        name : "Nevenka",
        surname : "Nevenkic",
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
var konobarInputs=["#ime-input","#prezime-input","#kime-input","#mail-input","#telefon-input","#lozinka1-input","#lozinka2-input"]
$(document).ready(function (){
    popuniSidebar("admin")
    refresh()
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
    $('#del-button-confirm').on('click',deleteKonobar)
    $("#kreiraj-konobara").on('click',kreiranjeKonobara)
    checkIfFilled(konobarInputs,$("#kreiraj-konobara"))
    for(let input of konobarInputs){
        $(input).on('input',()=>{
            checkIfFilled(konobarInputs,$("#kreiraj-konobara"))
        })
    }
})
function refresh(){
    // konobari = $.get(...) //AJAX
    let grid = $('.grid').first();
    popuni(grid,konobari)
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

function popuni(grid,data){
    grid.empty()
    data.forEach((konobar)=>{
        let card = $('<div class="card"></div>')
        card.css('background-image','url('+konobar.imagePath+')')
        let content = $('<div class="card-content"></div>')
        let buttonsDiv = $('<div class="buttons"></div>')
        let delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        let naslov = $('<h2 class="card-title"></h2>').text(konobar.name+" "+konobar.surname )
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
    
        let idK = $('#id').val()
        postDataWithSpinner("/apiDeleteWaiters",{id:idK})
        //TO DO DELETE
    
}
async function postDataWithSpinner(url,data){
    closeModal()
    setSpinner()
    await postData(url,data)
    refresh()
    resetSpinner()
}
async function kreiranjeKonobara(){
    let ime = $('#ime-input').val()
    let prezime = $('#prezime-input').val()
    let kime = $('#kime-input').val()
    let mail = $('#mail-input').val()
    let telefonA = $('#mail-input').val()
    let lozinka = $('#lozinka1-input').val()
    let lozinka2 = $('#lozinka2-input').val()
    let image = $('#image_input').prop('files')[0]
    let img_url="default_konobar.png"
    setSpinner()
    if(image != undefined){
        img_url = await uploadImage(image)
    }
    console.log("IMG URL:"+img_url)
    if(lozinka!=lozinka2){
        alert("Lozinke se ne poklapaju")
        return
    }
    //TO DO SLANJE
    let konobar =     {   
        name : ime,
        surname : prezime,
        telefon: telefonA,
        email : mail,
        korisnickoIme: kime,
        imagePath: img_url,
        password:lozinka
    }
    postDataWithSpinner("url",konobar)
}
function closeModal(){
    console.log("close modal")
    ignoreDoc=false
    modalCreateOpen=false
    modalDeleteOpen=false
    $('#delete-modal').css('display','none')
    $('#create-modal').css('display','none')
}