var smene= [
    {
        id:0,
        rdBr:1,
        startTime : "08:00",
        endTime : "16:00"
    },
    {
        id:1,
        rdBr:2,
        startTime : "16:00",
        endTime : "20:00"
    },
    {
        id:2,
        rdBr:3,
        startTime : "20:00",
        endTime : "02:00"
    }

]
var noveSmene= [

]

function createSmenaDiv(grid,smena){
    let div = $('<div class="smena"></div>')
    let table = $('<table></table>')
    let tbody = $('<tbody></tbody>')
    let thead = $('<thead><tr><td colspan="2">Smena '+smena.rdBr+'</td></tr></thead>')
    tr1 = $('<tr></tr>')
    td1_1 = $('<td>Pocetak</td>')
    td1_2 = $('<td></td>')
    let vremePocetak = $('<input type="time"  name="" id="vreme-poc-'+smena.rdBr+'">')
    // if(smena.rdBr>1){
    //     vremePocetak.attr('min',smene[smena.rdBr-2].endTime)
    // }
    // vremePocetak.attr('max',smene[smena.rdBr].startTime)
    vremePocetak.val(smena.startTime)
    tr2 = $('<tr></tr>')
    td2_1 = $('<td>Kraj</td>')
    td2_2 = $('<td></td>')
    let vremeKraj = $('<input type="time"  name="" id="vreme-kraj-'+smena.rdBr+'">')
    vremeKraj.attr('min' , smena.startTime)
    if(smena.rdBr<smene.length){        
        vremeKraj.attr('max',smene[smena.rdBr-1].startTime)
    }
    vremeKraj.val(smena.endTime)
    div.append(table)
    table.append(thead)
    table.append(tbody)
    tbody.append(tr1)
    tbody.append(tr2)
    tr1.append(td1_1)
    tr1.append(td1_2)
    tr2.append(td2_1)
    tr2.append(td2_2)
    td1_2.append(vremePocetak)
    vremePocetak.on('change',
    ()=>{
        //changeStartTime(smena.rdBr,vremePocetak)
    }
    )
    td2_2.append(vremeKraj)
    grid.append(div)
}

function popuni(grid,smene){
    grid.empty()
    for(let smena of smene){
        createSmenaDiv(grid,smena)
    }
}
function dodajSmenu(){
    let grid = $('#smene')
    let novaSmena=     {
        rdBr: smene.length==0?1:smene[smene.length-1].rdBr+1,
        startTime : smene[smene.length-1].endTime,
        endTime : "--:--:--"
    }
    smene.push(novaSmena)
    console.log('dodata smena')
    createSmenaDiv(grid,novaSmena)
}
function ukloniSmenu(){
    smene.pop()
    let grid = $('#smene')
    popuni(grid,smene)
}
function changeStartTime(rdBr,input){
    if(rdBr==0)return
    console.log(rdBr)
    let startTime = input.val() 

    //let input_poc =$('#vreme-poc-'+rdBr)
    let input_kraj_prev =$('#vreme-kraj-'+(rdBr-1))
    let input_kraj =$('#vreme-kraj-'+rdBr)
    input_kraj_prev.val(startTime)
    input_kraj_prev.attr('max',startTime)
    input_kraj.attr('min',startTime)
    rdBr-=1
    changeStartTime(rdBr,$())
}


$(document).ready(
    
    ()=>{
        
        let grid = $('#smene')
        popuni(grid,smene)
        $('#dodaj-smenu').on('click',dodajSmenu)
        $('#ukloni-smenu').on('click',ukloniSmenu)
    }
)