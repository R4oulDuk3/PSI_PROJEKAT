
var smene=[
    {
        idShift: 1,
        name: "Prva smena",
        start:"10:00:00",
        end:"16:00:00"

    },{
        idShift: 2,
        name:"Druga smena",
        start:"16:00:00",
        end:"00:00:00" 

    },{
        idShift: 7,
        name: "Treca smena",
        start:"20:00:00",
        end:"03:00:00" 

    }
]



var d = new Date(); // for now
var trVr = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
trVr = d.toTimeString().split(' ')[0]

function pozovi(Sr){
    let brojvreme=Sr.split(':')
    let sati=brojvreme[0]
    let minut=brojvreme[1]
    let sss=sati+minut
    return sss;
}







var s= new Date()


var trHour = s.getHours()
var trMin= s.getMinutes()

//var trVr= 100*trHour+trMin
let VremeString
function napraviVreme(tim){
    let H
    let M
    if(tim/100 < 10){
        //alert("Delim " + tim+ " sa 100 i dobijam ")
        H="0"+tim/100
        //alert(H)

    }else H=tim/100
    if(tim%100 < 10){
        M="0"+tim%100

    }else M=tim%100
    return H+':' + M 
}

var flagRano=false
var flagKasno=false
var flagSmene=false
var nema=false;
function proveri(body,data){
    let posalji=[]
    body.empty()
    let iCnt=0
    var imaSmena=0
    for(var smena of data){ //ako moze da zapocne smenu
        let k=pozovi(smena.end)
        let p=pozovi(smena.start)
        let t=pozovi(trVr)
        let tp=parseInt(t / 1000)
        //lert("Kraj " +k + " Pocetak " + p + " Trenutno " + t  + " Prvi broj tr " + tp)
        if((p<k && t>p && t<k) || (k<p && ((tp==0 && t<p && t<k) || (tp!=0 && t>p && t>k))))  {
                imaSmena++;
                 let pS=napraviVreme(smena.start)
                 let kS=napraviVreme(smena.end)
                let tr=$('<div class="card-single"><div><h1> '+smena.name + '</h1><br><h3 style="text-align: center;">'+smena.start+'-'+smena.end+ '</h3></div><div><button class="button" id="button'+smena.idShift+'"><b>Zapocni smenu</b></button><button class="buttonR" id="buttonR'+smena.idShift+'"><b>Zavrsi smenu</b></button></div></div>')
                body.append(tr)
                nema=true
                $("#button"+smena.idShift).on('click',()=>{
                    alert("Usla sam u button koji ima id" + $(this).attr('id'))
                    $('.buttonR').prop('disabled', false)
                    $('.button').prop('disabled', true)
                    //boji
                    // $('.button').removeClass('obojZeleno')
                    // $('.buttonR').removeClass('obojSivo')
                    // $('.button').addClass('obojSivo')
                    // $('.buttonR').addClass('obojCrveno')
                     alert("Unos smene")
                     $("#button"+smena.idShift).css("background-color","pink");
                     alert("Ovo se obojilo")
                     let smena = {
                        idShift:smena.idShift,
                        vremePocetka:smena.start,
                    }
                    alert("Poslala sam podatke")
                     //$.post(host+"??",smena)//AJAX
                 })
                 $("#buttonR"+smena.idShift).on('click',()=>{
                    $('.buttonR').prop('disabled', true)
                    $('.button').prop('disabled', false)
                    // $('.button').removeClass('obojSivo')
                    // $('.buttonR').removeClass('obojCrveno')
                    // $('.button').addClass('obojZeleno')
                    // $('.buttonR').addClass('obojSivo')
                    alert("Zavrsi smenu")
                    let smena = {
                        idShift:smena.idShift,
                        vremeKraja:smena.end,
                    }
                    alert("Poslala sam podatke")
                     //$.post(host+"??",smena)//AJAX
                })

            }else  {
                flagRano=true

               
            }
            }
            if(!nema){ let tr=$('<div class="card-single"><div><h1> '+ "Trenutno ne postoje smene" + '</h1><br></div></div>')
                body.append(tr)
    }
    // if(flagRano && imaSmena==0){
    //     alert("Dosao si prerano")
    // }
    // if(flagKasno && imaSmena==0){
    //     alert("Dosao si prekasno")
    // }
}


function napraviBod(data){
    alert("usla")
    for(let s of data){
        let k=pozovi(s.end)
        let p=pozovi(s.start)
        let t=pozovi(trVr)
        let tp=parseInt(t / 1000)
        alert("Kraj " +k + " Pocetak " + p + " Trenutno " + t  + " Prvi broj tr " + tp)
    }
}


$(document).ready(
    ()=>{
        let body=$('#main')
 
        proveri(body,smene)
        //napraviBod(smene)
        
    }

);