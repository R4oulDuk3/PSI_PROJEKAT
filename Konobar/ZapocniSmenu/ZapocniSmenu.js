var smene=[
    {
        idSmene: 1,
        redniBrSmene: 1,
        pocetak:0800,
        kraj:1600

    },{
        idSmene: 1,
        redniBrSmene: 2,
        pocetak:1600,
        kraj:2200 

    }
]

var trVr= 100*trHour+trMin
var trHour = Date.prototype.getHours()
var trMin= Date.prototype.getMinutes()

function popuni(body,data){

}


function proveri(body,data){
    body.empty()
    for(smena of data){
        // if(smena.pocetak<=trVr && trVr<=smena.kraj){
        //         alert("Mozes da pocnes smenu")
        // }
        alert("Trenutno vreme je " + trVr)
        alert("A vreme smene je  " + smena.pocetak + " a kraj je " + smena.kraj)
    }
}
$(document).ready(
    ()=>{
        alert("USAO")
        let body=$('#main')
        alert("Provera")
        proveri(body,smene)
    }
);