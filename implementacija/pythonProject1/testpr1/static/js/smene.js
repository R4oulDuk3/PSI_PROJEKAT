var smene= [
    {
        id:0,
        rdBr:1,
        startTime : "07:00",
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
function convertSmene(smene){
    let nSmene = []
    for(let smena of smene){
        nSmena = {
            id: smena.idshift,
            rdBr: smena.idshift,
            startTime: smena.start,
            endTime: smena.end
        }
        nSmene.push(nSmena)
    }
    return nSmene
}
function convertSmeneBack(smene){
    let nSmene = []
    for(let smena of smene){
        let nSmena = {
            idshift: smena.rdBr,
            start : smena.startTime,
            end : smena.endTime
        }
        nSmene.push(nSmena)
    }
    return nSmene
}

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
        changeStartTime(smena.rdBr,vremePocetak)
    }
    )
    vremeKraj.on('change',
    ()=>{
        changeEndTime(smena.rdBr,vremeKraj)
    })
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
    $('#sacuvaj-smene').prop('disabled',false)
    $('.error-div').hide()
}
function ukloniSmenu(){
    smene.pop()
    let grid = $('#smene')
    popuni(grid,smene)
    $('#sacuvaj-smene').prop('disabled',false)
    if(smene.length==0)$('#sacuvaj-smene').prop('disabled',true)
     $('.error-div').hide()
}
function findElemByKey(arr,key,id){
    for(let elem of arr){
        if(elem[key]==id)return elem;
    }
    return null
}
function changeStartTime(rdBr,input){
    //if(rdBr==0)return
    console.log(rdBr)
    let startTime = input.val()
    let smena = findElemByKey(smene,"rdBr",rdBr)
    smena.startTime = startTime
    //let input_poc =$('#vreme-poc-'+rdBr)
    let input_kraj_prev =$('#vreme-kraj-'+(rdBr-1))
    //let input_kraj =$('#vreme-kraj-'+rdBr)
    input_kraj_prev.val(startTime)
    let smenaPrev = findElemByKey(smene,"rdBr",rdBr+1)
    if(smenaPrev!=null){
        smenaPrev.endTime = startTime
    }
    $('#sacuvaj-smene').prop('disabled',false)
     $('.error-div').hide()
}

function changeEndTime(rdBr,input){
    //if(rdBr==smene.length)return
    console.log(rdBr)
    let endTime = input.val()
    let smena = findElemByKey(smene,"rdBr",rdBr)
    console.log(parseInt(smena.startTime)-parseInt(endTime))
    console.log("ispred")
    if(parseInt(smena.startTime)>parseInt(endTime)&&(parseInt(smena.startTime)-parseInt(endTime))<8){
        console.log("usao")
        endTime=smena.startTime
    }
    smena.endTime = endTime
    input.val(endTime)
    //let input_poc =$('#vreme-poc-'+rdBr)
    let input_poc_next =$('#vreme-poc-'+(rdBr+1))
    //let input_kraj =$('#vreme-kraj-'+rdBr)
    input_poc_next.val(endTime)
    let smenaNext = findElemByKey(smene,"rdBr",rdBr+1)
    if(smenaNext!=null){
        smenaNext.startTime = endTime

    }

    $('#sacuvaj-smene').prop('disabled',false)
     $('.error-div').hide()
}
function sacuvajSmene(){
    console.log(smene)
    let hours=0
    let error=false
    let last_end = smene[0].startTime
    for(let smena of smene){
        console.log(last_end)
        console.log(smena.startTime)
        if(smena.startTime!=last_end)error=true
        if(smena.startTime>smena.endTime){
            hours += 24 - (parseInt(smena.startTime)-parseInt(smena.endTime))
        }else{
            hours+=(parseInt(smena.endTime)-parseInt(smena.startTime))
        }
        last_end=smena.endTime
    console.log(hours)
    }
    if(hours>24){
        $("#err-msg").text("Smene pokrivaju vise od 24 sata")
        $('.error-div').show()
        return
    }else if(error){
        $("#err-msg").text("Neispravan format smena")
        $('.error-div').show()
        return;
    }
    let smenePost = convertSmeneBack(smene)
    console.log(smenePost)
    postDataWithSpinner("apiChangeShift",{smeneInfo: JSON.stringify(smenePost)})
    $('#sacuvaj-smene').prop('disabled',true)
}

$(document).ready(
    
    async ()=>{
        popuniSidebar("admin")
        let grid = $('#smene')
        await refresh()
        popuni(grid,smene)
        $('#dodaj-smenu').on('click',dodajSmenu)
        $('#ukloni-smenu').on('click',ukloniSmenu)
        $('#sacuvaj-smene').on('click',sacuvajSmene)
        $('#sacuvaj-smene').prop('disabled',true)
        $('.error-div').hide()
    }
)

async function refresh(){
    smene = await $.get('apiShift')
    smene = convertSmene(smene)
}

async function postDataWithSpinner(url,data){

    setSpinner()
    await postData(url,data)
    await refresh()
    resetSpinner()
}