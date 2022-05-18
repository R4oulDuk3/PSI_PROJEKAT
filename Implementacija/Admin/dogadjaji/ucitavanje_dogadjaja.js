
var data = [
    {
        name: 'Zurka 1',
        desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        imgName: '../assets/zurkeNajave.png'
    },
    {
        name: 'Zurka 1',
        desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        imgName: '../assets/zurkeNajave.png'
    }
]

var modalCreateOpen = false
var modalDeleteOpen= false
var ignoreDoc=false

$(document).ready(function (){
    let grid = $('.grid').first();
    popuni(grid,data)
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


function popuni(grid,data){
    data.forEach((zurka)=>{
        let karta = $('<div></div>').addClass('card');
        let dogadjaj = $("<div></div>").addClass('card-content');
        let naslov = $("<h2></h2>").addClass('card-title').append(zurka.name);
        let opis = $("<p></p>").addClass('card-body').append(zurka.desc);
        let dugme = $("<a></a>").attr('href','#').addClass('button-card').addClass('modal-btn-del').append('Obrisi dogadjaj');
        dugme.on('click',()=>{
            openDeleteModal(zurka.name)
        })
        dogadjaj.append(naslov);
        dogadjaj.append(opis);
        dogadjaj.append(dugme);
        karta.append(dogadjaj);
        karta.css('background-image',"url("+zurka.imgName+")");
        var img = new Image;
        img.src = zurka.imgName
        var height = img.height;
        console.log(height)
        //karta.css('padding-top', height+"px");
        grid.append(karta)
        //grid.append($('<div></div>')); 
    })
}



