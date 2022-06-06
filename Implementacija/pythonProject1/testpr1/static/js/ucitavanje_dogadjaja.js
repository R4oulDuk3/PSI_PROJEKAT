
import {downloadImage, uploadImage} from './index.js'


console.log("checkkkkk")
var data = [
    {   idevents : "123##1231##12",
        name: 'Zurka 1',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        picture : 'assets/zurkeNajave.png'
    },
    {   idevents : "123abc125d",
        name: 'Zurka 1',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        picture : 'assets/zurkeNajave.png'
    }
]

var postavke = [
    {
        name:"postavka1"
    },
    {
        name:"postavka2"
    }
]

var modalCreateOpen = false
var modalDeleteOpen= false
var ignoreDoc=false
var createZurkaInputs=["#input-naslov","#input-datum"]
$(document).ready(async function (){
    popuniSidebar("admin")
    // // data = await $.get(host+"/apiEvents")  //AJAX
    // let grid = $('.grid').first();
    // popuni(grid,data)
    await refresh()
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
      $('#modal-del-input').on('input',()=>{
        console.log("check")
        checkIfMathcing()
    })
    $('#create-zurka').on('click',createZurka)
    $('#del-button-confirm').on('click',deleteZurka)
    $('#input-datum').attr('min',new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0])

    checkIfFilled(createZurkaInputs,$('#create-zurka'))
    for(let input of createZurkaInputs){
        $(input).on('input',()=>{
            checkIfFilled(createZurkaInputs,$('#create-zurka'))
        })
    }
})
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

function checkIfMathcing(){
    if($('#modal-del-input').val()==$('#id').text()){
        console.log("poklapa se")
        $("#del-button-confirm").prop('disabled', false);
    }else{
        $("#del-button-confirm").prop('disabled', true);
    }
}

function openDeleteModal(placeholder){
    modalDeleteOpen=true
    ignoreDoc=true
    console.log(placeholder)
    $('#delete-modal').css('display','inline-block')
    $('#modal-del-input').attr('placeholder',placeholder)
    $('#id').text(placeholder)
    $("#del-button-confirm").prop('disabled', true);
    checkIfMathcing()
}
function openCreateModal(){
    resetErrors()
    //DOHVATI POSTAVKE
    $('#postavke').empty()
    for(let postavka of postavke){
        $('#postavke').append($('<option value="'+postavka.idsetup+'" style="font-size:large;font-weight:700">'+postavka.name+'</option>'))
    }
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
async function deleteZurka(){
    if( $('#id').text()== $('#modal-del-input').val()){
        let id = $('#id').text();closeModal()
        setSpinner()
        await postData('apiDeleteEvent', {idEvent:id})
        await refresh()
        resetSpinner()

    }

    closeModal()
}
function resetErrors(){
    $('#err-naslov').text("")
    $('#err-datum').text("")
}
async function createZurka(){
    console.log("check")
    let naslov = $('#input-naslov').val()
    let opis = $('#input-opis').val()
    let datum = $('#input-datum').val()
    let postavka = $('#postavke').val()
    let image = $('#image_input').prop('files')[0]
    let errExist=false
    console.log(naslov)
    console.log(opis)
    console.log(datum)
    console.log(postavka)
    setSpinner()
    let img_url = "default_event.png"
    if(image != undefined){
        img_url =await uploadImage(image)
    }
    

    let zurka =     {
        name: naslov,
        description : opis,
        start: datum,
        picture : img_url,
        setup : postavka
    }
    console.log(postavka)

    closeModal()

    await postData('apiCreateEvent',zurka)
    await refresh()
    resetSpinner()

}


async function refresh(){
    data = await $.get("apiEvents")  //AJAX
    postavke = await $.get("apiSetup")//AJAX
    console.log(postavke)
    let grid = $('.grid').first();
    popuni(grid,data)
}

 function popuni(grid,data){
    // TODO: SEND HTTP GET ALL
    grid.empty()
    data.forEach(async (zurka)=>{
        let karta = $('<div></div>').addClass('card');
        let dogadjaj = $("<div></div>").addClass('card-content');
        let naslov = $("<h2></h2>").addClass('card-title').append(zurka.name);
        let opis = $("<p></p>").addClass('card-body').append(zurka.desc);
        let dugme = $("<a></a>").attr('href','#').addClass('button-card').addClass('modal-btn-del').append('Obrisi dogadjaj');
        dugme.on('click',()=>{
            openDeleteModal(zurka.idevents)
        })
        dogadjaj.append(naslov);
        dogadjaj.append(opis);
        dogadjaj.append(dugme);
        karta.append(dogadjaj);
        karta.css('background-image',"url("+(await downloadImage(zurka.picture))+")");
        // var img = new Image;
        // img.src = zurka.imgName
        // var height = img.height;
        // console.log(height)
        //karta.css('padding-top', height+"px");
        grid.append(karta)
        //grid.append($('<div></div>')); 
    })
    }



