import { uploadImage ,downloadImage} from "../index.js"

let kuponi = [
    {
        idcoupon:1,
        name: "Besplatno pivo",
        description : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',

        picture  :'assets/beer.jpg'
    },
    {
        idcoupon:2,
        name: "Besplatna kibla",
        description : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',

        picture  :'assets/beer.jpg'
    },
]
var modalCreateOpen = false
var modalDeleteOpen= false
var ignoreDoc=false
var file=null
var inputs = ["naziv-input",]
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
    
      $('#image-input').on('change',chooseFile)
      for(let input of inputs){
        $("#"+input).on('change keyup paste',checkIfFilled)
    }
    $("#create-button").on('click',kreiranjeKupona)
    $("#del-btn-potvrdi").on('click',brisanjeKupona)
    checkIfMathcing()
    $("#modal-del-input").on("input",checkIfMathcing)
})

function popuni(grid,data){
    grid.empty()
    data.forEach(async (kupon)=>{
        let card = $('<div class="card"></div>')
        card.css('background-image','url('+(await downloadImage(kupon.picture) ) +')')
        let content = $('<div class="card-content"></div>')
        let buttonsDiv = $('<div class="buttons"></div>')
        let delButton = $('<button class="sm-button"><span class="las la-times"></span></button>')
        let naslov = $('<h2 class="card-title"></h2>').text(kupon.name)
        let tekst = $('<p class="card-body">Opis: '+kupon.description +"<br>Cena: "+ kupon.cena +'</p>')
        delButton.on('click',()=>{
            openDeleteModal(kupon.idcoupon)
        })
        buttonsDiv.append(delButton)
        content.append(buttonsDiv)
        content.append(naslov)
        content.append(tekst)
        card.append(content)
        grid.append(card)
    })
}
function checkIfFilled(){
    console.log("check")
    for(let input of inputs){
        console.log(input+" val "+ $("#"+input).val())
        if($("#"+input).val()=="" || $("#"+input).val()==undefined){
            $("#create-button").prop('disabled', true);
            console.log("check1")
            return false
        }
    }
    $("#create-button").prop('disabled', false);
    
    return true
}

function checkIfMathcing(){
    if($('#modal-del-input').val()==$('#id').text()){
        console.log("poklapa se")
        $("#del-btn-potvrdi").prop('disabled', false);
    }else{
        console.log("ne poklapa se")
        $("#del-btn-potvrdi").prop('disabled', true);
    }
    return $('#modal-del-input').val()==$('#id').text()
}

async function postDataWithSpinner(url,data){
    closeModal()
    setSpinner()
    //await postData(url,data)
    refresh()
    resetSpinner()
}
function refresh(){
    let grid = $('.grid').first();
    // kuponi = $.get() //AJAX
    popuni(grid,kuponi)
}

async function kreiranjeKupona(){
    if(!checkIfFilled())return
    let nameK = $('#naziv-input').val()
    let descriptionK  = $('#opis-input').val()
    file = $("#image_input").prop('files')[0]
    let img_url= "default_coupon.png"
    setSpinner()
    if(file!=undefined){
        img_url=await uploadImage(file)
    }
    console.log("IMG URL "+img_url)
    console.log("Slanje podataka")

    let kupon = {
            name: nameK,
            description : descriptionK,    
            picture : img_url
    }
    console.log(kupon)
    postDataWithSpinner("apiCreateCoupon",kupon)
}
async function brisanjeKupona(){
    let id = $("id").val()
    postDataWithSpinner("url",{idcoupon:id})

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
    $('#create-modal').css('display','inline-block')
    checkIfFilled()
    
}
function closeModal(){
    console.log("close modal")
    ignoreDoc=false
    modalCreateOpen=false
    modalDeleteOpen=false
    $('#delete-modal').css('display','none')
    $('#create-modal').css('display','none')
}

function chooseFile(e){
    file=e.target.files[0]
    console.log(file)
}