let kuponi = [
    {
        naziv: "Besplatno pivo",
        opis: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        cena: '1000',
        imagePath :'../assets/beer.jpg'
    },
    {
        naziv: "Besplatna kibla",
        opis: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        cena: '1000',
        imagePath :'../assets/beer.jpg'
    },
]
var modalCreateOpen = false
var modalDeleteOpen= false
var ignoreDoc=false
$(document).ready(function (){
    let grid = $('.grid').first();
    popuni(grid,kuponi)
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
    data.forEach((kupon)=>{
        card = $('<div class="card"></div>')
        card.css('background-image','url('+kupon.imagePath+')')
        content = $('<div class="card-content"></div>')
        buttonsDiv = $('<div class="buttons"></div>')
        delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        naslov = $('<h2 class="card-title"></h2>').text(kupon.naziv)
        tekst = $('<p class="card-body">Opis: '+kupon.opis+"<br>Cena: "+ kupon.cena +'</p>')
        delButton.on('click',()=>{
            openDeleteModal(kupon.naziv)
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