var data = [
    {  
        name: 'Zurka 1',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        
    },
    {   
        name: 'Zurka 2',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
       
    },
    {   
        name: 'Zurka 3',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
       
    }
]

var brojStola
var brojLjudiNaStolu
var rezervacija=[]
var dogadjaj

function popunideo1(body,data){
    body.empty()
    for (let dogadjaj of data){
        let tr = $('<a href="#" >'+dogadjaj.name+'</a>')
        body.append(tr)
    }
}

function PopUpPopuni(body){
    body.empty()
    let dog=dogadjaj;
    let imeIprezime=document.getElementById("in1").value;
    let brtel=document.getElementById("in2").value
    let brgost=document.getElementById("in3").value
    rezervacija.push({
        Dogadja:dog,
        Ime:imeIprezime,
        brojT:brtel,
        brojOsoba:brgost,
        sto:brojStola,
        ljudinasto:brojLjudiNaStolu
    })
    let tr = $('<td>'+dog+'</td><td>'+imeIprezime+'</td><td>'+brtel+'</td><td>'+brgost+'</td><td>'+brojLjudiNaStolu+'</td>')
    body.append(tr)
}

function posalji(){
    //$.post(url,rezervacija)   
}
let flag =false
let pr
$(document).ready(
    ()=>{
        let body=$('#deo1')
        let bodyPopUp=$('#bodyPopUp')
        popunideo1(body,data)
    $('#mytable tr').on('click',function() { 
        let tr=$(this)
        brojStola= $(this).find("td").eq(0).html();      
        brojLjudiNaStolu = $(this).find("td").eq(1).html();   
        if(flag){
            $(pr).addClass('deselected');
            $(this).addClass('selected');
            pr=tr
        }else{
            flag=true
            $(this).addClass('selected');
            pr=tr
        }

    });
    $('#deo1 a').on('click',function() { 
        let  thisdata = $(this).html();
        dogadjaj=thisdata;
        //alert(thisdata)
        document.getElementById("dog").innerHTML = thisdata;
    });

    $(".trigger_popup_fricc").click(function(){
        PopUpPopuni(bodyPopUp)
       $('.hover_bkgr_fricc').show();

    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('#sacuvaj-bttn').on('click',function() { 
        posalji()
    });
    }
);

