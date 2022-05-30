
var smene=[
    {
        idSmene: 1,
        redniBrSmene: 1,
        pocetak:0800,
        kraj:1600

    },{
        idSmene: 2,
        redniBrSmene: 2,
        pocetak:1600,
        kraj:2200 

    },{
        idSmene: 7,
        redniBrSmene: 3,
        pocetak:0000,
        kraj:0800 

    }
]

var s= new Date()


var trHour = s.getHours()
var trMin= s.getMinutes()

var trVr= 100*trHour+trMin


function proveri(body,data){
    body.empty()
    
    for(smena of data){
        alert("Trenutno vr " + trVr)
        if(smena.pocetak<=trVr && trVr<=smena.kraj){
                alert("Mozes da pocnes smenu")
        }
    }
}

$(document).ready(
    ()=>{
        let body=$('#main')
        alert("Provera")
        proveri(body,smene)
    }
);