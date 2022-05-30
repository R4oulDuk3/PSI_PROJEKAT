
var smene=[
    {
        idSmene: 1,
        redniBrSmene: 1,
        pocetak:"1000",
        kraj:"1600"

    },{
        idSmene: 2,
        redniBrSmene: 2,
        pocetak:"1600",
        kraj:"2000" 

    },{
        idSmene: 7,
        redniBrSmene: 3,
        pocetak:"0000",
        kraj:"0800" 

    }
]

var s= new Date()


var trHour = s.getHours()
var trMin= s.getMinutes()

var trVr= 100*trHour+trMin
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


function proveri(body,data){
    let posalji=[]
    body.empty()
    let iCnt=0
    for(smena of data){ //ako moze da zapocne smenu
        if(smena.pocetak<=trVr && trVr<=smena.kraj && smena)  {
                 let pS=napraviVreme(smena.pocetak)
                 let kS=napraviVreme(smena.kraj)
                let tr=$('<div class="card-single"><div><h1>Smena '+smena.redniBrSmene + '</h1><br><h3 style="text-align: center;">'+pS+'-'+kS+ '</h3></div><div><button class="button" id="button'+smena.idSmene+'"><b>Zapocni smenu</b></button><button class="buttonR" id="buttonR'+smena.idSmene+'"><b>Zavrsi smenu</b></button></div></div>')
                body.append(tr)
                $("#button"+smena.idSmene).on('click',()=>{
                     alert("Unos smene")
                     let smena = {
                        idSmene:smena.idSmene,
                        vremePocetka:smena.pocetak,
                        RedniBrojSmene: smena.redniBrSmene
                    }
                    alert("Poslala sam podatke")
                     //$.post(host+"??",smena)//AJAX
                 })
                 $("#buttonR"+smena.idSmene).on('click',()=>{
                    alert("Zavrsi smenu")
                    let smena = {
                        idSmene:smena.idSmene,
                        vremeKraja:smena.kraj,
                        RedniBrojSmene: smena.redniBrSmene
                    }
                    alert("Poslala sam podatke")
                     //$.post(host+"??",smena)//AJAX
                })

            }else if(smena && smena.pocetak>trVr && trVr<=smena.kraj ) {
                
                alert("Nije tvoje vreme za smenu dosao si prerano")
            }
            else if(smena && trVr>smena.kraj && smena.pocetak<=trVr){
                alert("Nije tvoje vreme za smenu dosao si prekASNO")
            }
            if(smena==0){
                alert("Nema smena")
            }
    }
}

$(document).ready(
    ()=>{
        let body=$('#main')
 
        proveri(body,smene)
        
        
    }

);