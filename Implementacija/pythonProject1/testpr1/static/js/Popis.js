
var artikli=[
    {
        id: 1,
        name: 'Amstel',
        kolicina : '10',
        nedostatakLimit: '10',  //
        sifraProizvoda: '2123232323232',
        nabavnaCena: '140',
        sifraDobavljaca: '1231231232131'

    },{
        id: 2,
        name: 'Niksicko',
        kolicina : '10',
       nedostatakLimit: '10',
        sifraProizvoda: '2123232323232',
        nabavnaCena: '140',
        sifraDobavljaca: '1231231232131'

    }
]


function popuni(body,data){
    body.empty()
    for(let artikal of data){
        let tr = $('<tr><td>'+artikal.name+'</td><td><input id="create-modal-cena-input_'+artikal.idproduct+'" type="number" value="0" min="0" oninput="this.value = Math.abs(this.value)"></td></tr>')
        body.append(tr)
    }
}

function PopUpPopuni(body,data){
    body.empty()
    for (let artikal of data){
        let tr = $('<tr><td>'+artikal.name+'</td><td>'+artikal.potrosenaKolicina+'</td></tr>')
        body.append(tr)
    }
}

function ocitaj(){
    let popis = []

    for(let artikal of artikli){
        let kolicina = $('#create-modal-cena-input_'+artikal.idproduct).val()
        popis.push({
            idproduct:artikal.idproduct,
            name: artikal.name,
            potrosenaKolicina:kolicina
        })
        
    }
    return popis
}
   // console.log(popis)
    //$.post(url,popis)
    // $(window).load(function () {
        
    // });

$(document).ready(
    async ()=>{
        popuniSidebar("konobar")
        var popis = []
        artikli = await $.get("apiProductAll")
        let body=$('#body')
        let bodyPopUp=$('#bodyPopUp')
        $(".trigger_popup_fricc").click(function(){
            popis=ocitaj()
            PopUpPopuni(bodyPopUp,popis)
            //popuni pop-up
           $('.hover_bkgr_fricc').show();
        });
        $('.hover_bkgr_fricc').click(function(){
            $('.hover_bkgr_fricc').hide();
        });
        $('.popupCloseButton').click(function(){
            $('.hover_bkgr_fricc').hide();
        });
        popuni(body,artikli)
        $("#potvrdi-btn").on('click',()=>{
            postData('apiUpdateProduct',{popis:JSON.stringify(popis)})
           // $.post(url,popis) 
            alert("Uspesno ste potvrdili popis!")
            $('.hover_bkgr_fricc').hide();
           
        })
    }
);
