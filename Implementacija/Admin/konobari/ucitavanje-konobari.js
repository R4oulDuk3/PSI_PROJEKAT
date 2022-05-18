let konobari = [
    {   id:"1",
        ime: "Marko Savic",
        telefon: '+38162626262',
        email: 'marko-savic@gmail.com',
        korisnickoIme: 'mareSavke',
        imagePath:'../assets/konobar.jpg'
    },
    {   id:"2",
        ime: "Nevenka Nevenkic",
        telefon: '+38162626262',
        email: 'nevenkaNevenkic@gmail.com',
        korisnickoIme: 'nenaNena',
        imagePath:'../assets/konobarka.webp'
    }
]
var modalCreateOpen = false
var modalDeleteOpen= false
var ignoreDoc=false
$(document).ready(function (){
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
    

})

function popuni(grid,data){
    data.forEach((konobar)=>{
        card = $('<div class="card"></div>')
        card.css('background-image','url('+konobar.imagePath+')')
        content = $('<div class="card-content"></div>')
        buttonsDiv = $('<div class="buttons"></div>')
        delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        naslov = $('<h2 class="card-title"></h2>').text(konobar.ime)
        tekst = $('<p class="card-body">Telefon: '+konobar.telefon+"<br>email: "+ konobar.email +'</p>')
        delButton.on('click',()=>{
            openDeleteModal(konobar.ime)
        })
        buttonsDiv.append(delButton)
        content.append(buttonsDiv)
        content.append(naslov)
        content.append(tekst)
        card.append(content)
        grid.append(card)
    })
}

function openDeleteModal(placeholder){
    modalDeleteOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','inline-block')
    $('#modal-del-input').attr('placeholder',placeholder)
}
function openCreateModal(){
    modalCreateOpen=true
    ignoreDoc=true
    $('#create-modal').css('display','inline-block')
    
}
function closeModal(){
    console.log("close modal")
    ignoreDoc=false
    modalCreateOpen=false
    modalDeleteOpen=false
    $('#delete-modal').css('display','none')
    $('#create-modal').css('display','none')
}