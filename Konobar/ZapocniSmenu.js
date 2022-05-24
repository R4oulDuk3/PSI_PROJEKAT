var smene=[
    {
        idSmene: 1,
        redniBrSmene: 1,
        pocetak:"08:00",
        kraj:"16:00"

    },{
        idSmene: 1,
        redniBrSmene: 2,
        pocetak:1600,
        kraj:2200 

    }
]

var trVr= new Date();


function popuni(body,data){

}


function proveri(body,data){
    for(smena of data){
        smena.pocetak<new Date()
    }
}


$document().ready(
    ()=>{
        let body=$('#body')
        proveri(body,smene)
    }
)