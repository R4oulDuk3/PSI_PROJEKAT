
var konobari = [
    {
        id: 1,
        ime: "Marko",
        prezime:"Savic",
        telefon: '+38162626262',
        email: 'marko-savic@gmail.com',
        korisnickoIme: 'mareSavke',
        imagePath:'../assets/konobar.jpg'
    },
    {   id: 2,
        ime: "Nevenka",
        prezime:"Savic",
        telefon: '+38162626262',
        email: 'nevenkaNevenkic@gmail.com',
        korisnickoIme: 'nenaNena',
        imagePath:'../assets/konobarka.webp'
    }
]
var preference = [
    {
        day:new Date(2022,4,19),
        shift:1,
        konobarId: 1
    },
    {
        day:new Date(2022,4,19),
        shift:1,
        konobarId: 2
    },
    {
        day:new Date(2022,4,19),
        shift:1,
        konobarId: 2
    }
]
var prethodniRaspored=[
     {
        idSmene: 1,
        konobarId: 1,
        date : new Date(2022,4,17)
     },
     {
        idSmene: 1,
        konobarId: 1,
        date : new Date(2022,4,18)
     },
     {
        idSmene: 1,
        konobarId: 1,
        date : new Date(2022,4,19)
     }
    ]
    

var smene = [
    {
        id:0,
        pocetak: 8,
        kraj: 12
    },
    {
        id:1,
        pocetak:12,
        kraj:20,
    },
    {
        id:2,
        pocetak:20,
        kraj:4
    }
]
var noviRaspored=[

]
let tableInfo=[]

var startDate=null;
var endDate=null;
var razlika=0;

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function findKonobarById(id){
    for(konobar of konobari){
        if (konobar.id==id)return konobar
    }
}
function getTableData(){
    let data=[]
    for(i=0;i< tableInfo.length;i++){
        for(let j=0;j<tableInfo[0].length;j++){
            td = tableInfo[i][j]
            // td.children().each(
            //     ()=>{
            //         let idString=$( this )
            //         console.log("id: "+idString.outerHTML)
            //         let id = parseInt(idString.split('_')[1])
            //         data.push({
            //             idSmene: i,
            //             konobarId: id,
            //             date : new Date(startDate.getTime() + 86400000*j)
            //         })
            //     }
            // )
            let children = td.children()
            console.log("bROJ: "+children.length)
            for(let elem of children){
                    let idString= elem.id
                    
                    let id = parseInt(idString.split('_')[1])
                    console.log("id: "+id)
                    data.push({
                        idSmene: i,
                        konobarId: id,
                        date : new Date(startDate.getTime() + 86400000*j)
                    })
            }
        }
    }
    return data
}

function fillTable(raspored){
    for(info of raspored){
        let i = info.idSmene
        let j = datediff(startDate,info.date)
        
       // if(j>=datediff(endDate,startDate))continue
        console.log("loc i: "+i+" j : "+j)
        console.log(info.konobarId)
        let elem=$('<div class="draggable" draggable="true" id="konobar_'+info.konobarId+'"><div>'+ findKonobarById(info.konobarId).ime +' '+findKonobarById(info.konobarId).prezime +'</div></div>')
        let button =$('<button class="sm-button"  style="display:block;"><span class="las la-times delete"></span></button>')
        button.on('click',()=>{
            elem.remove()
        })
        elem.append(button)
        console.log("i: "+i +" j: "+j)
        if((i>=0 && j>=0) && (j<datediff(startDate,endDate)))tableInfo[i][j].append(elem)
    }
}

const weekday = ["Nedelja","Ponedeljak","Utorak","Sreda","Cetvrtak","Petak","Subota"];
function getKonobarsForDay(date, rdBrSmene){
    let ret = "Konobari slobodni za ovaj dan su:\n"
    let noKonobars = true;
    console.log(date)
    for(let preferenca of preference){

        if(preferenca.day.getTime()==date.getTime() && preferenca.shift==rdBrSmene){

            let konobar= findKonobarById(preferenca.konobarId)
            ret+= konobar.ime+" "+konobar.prezime+"\n"
            noKonobars=false;
        }
    }
    if(noKonobars)return "Nema konobara slobodnih za ovaj dan"
    return ret
}
function initEmptyTable(){
    tableInfo=[]
    let date = new Date(startDate.getTime())
    let theadtr= $("<tr><td>Smena</td></tr>")
    let infoRows =[]
    for(let i=0;i<smene.length;i++){
        infoRows.push($("<tr><td>"+(i+1)+"</td></tr>"))
        tableInfo.push([])
    }
    razlika=0;
    while(date.getTime()!=endDate.getTime()){
        console.log(date.getTime()+" "+endDate.getTime())
        theadtr.append($("<td>"+ weekday[date.getDay()]+ "</td>)"))
        let thisDay =date;
        for(let i=0;i<smene.length;i++){
            let td = $("<td class='container tooltip'></td>");
            // let span = $('<span class="tooltiptext"></span>')
            // span.text(getKonobarsForDay(date,i+1))
            td.hover(()=>{
                td.css("background-color", "#cc0099");
                changeInfoMsg(getKonobarsForDay(thisDay,i+1))
            },()=>{
                td.css("background-color", "#ffffff");
            })
            //td.append(span)
            infoRows[i].append(td)
            tableInfo[i].push(td)
        }
        date = new Date(date.getTime()+ 86400000)
        razlika++;
    }
    let thead = $("<thead></thead>").append(theadtr)
    let tbody = $("<tbody></tbody>")
    for(let i=0;i<smene.length;i++){
        tbody.append(infoRows[i])
    }
    $("#table").empty()
    $("#table").append(thead).append(tbody)
}
function changeInfoMsg(msg){

    $("#infoMsg").text(msg)
}
function showTable(){
    startDate = $("#date-start").val()
    endDate = $("#date-end").val()
    if(!startDate ||  !endDate){
        console.log(startDate+" "+endDate)
    }else{
        if(startDate>endDate)return
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        //dohvati raspored
        console.log("show")
        startDate.setHours(0,0,0,0)
        endDate.setHours(0,0,0,0)
        console.log(startDate.getTime()+" "+endDate.getTime())
        noviRaspored=getTableData()
        initEmptyTable()
        fillTable(prethodniRaspored)
        initializeDrag()
        $("#info").hide()
        $("#card-konobari").show()
        $("#save-btn").show()
        $("#table").show()
        $(".infoMsg").first().css('display', 'flex')
    }
}

var konobariDivs=[]

function initKonobari(){
    for(let k of konobari){
        
        let konobarDiv = $('<div class="draggable" draggable="true" id="konobar_'+k.id+'"><div>'+k.ime+'</div><button class="sm-button"><span class="las la-times delete"></span></button></div>')
        konobariDivs.push({
            konobar : k,
            div : konobarDiv
        })
        $('#konobari').append(konobarDiv)
    }
    
}
async function postDataWithSpinner(url,data){
    setSpinner()
    await postData(url,data)
    refresh()
    resetSpinner()
}

function sendNoviRaspored(){
    let raspored = getTableData()
    
    let info = {
        startDate: startDate,
        endDate: endDate,
        raspored: raspored
    }
    console.log(JSON.stringify(info))
    postDataWithSpinner("url",info) //AJAX
    //sendData
    //return to rasporedi
}
function convertKonobari(konobari){
    let newKonobari = []
    for(let konobar of konobari){
        nKon = {   
            id: konobar.idusers,
            ime: konobar.name,
            prezime: konobar.surname,
            telefon: konobar.phone,
            email: konobar.email,
            korisnickoIme: konobari.username,
        }
        newKonobari.push(nKon)
    }
    return newKonobari
}
function convertSmene(smene){
    let nSmene = []
    for(let smena of smene){
        nSmena = {
            id: smena.idshift,
            pocetak: smena.start,
            kraj: smena.end
        }
        nSmene.push(nSmena)
    }
    return nSmene
}
function convertRaspored(rasporedi){
    nRaspored= []
    for(let raspored of rasporedi){
        nRas = {
            idSmene: raspored.shift,
            konobarId: raspored.waiter,
            date : new Date(raspored.day)
        }
        nRaspored.push(nRas)
    }
    return nRaspored
}
async function refresh(){
    // prethodniRaspored = await $.get(...)//AJAX
    // smene = await $.get(...) //AJAX
    //
}

$(document).ready(function (){
    //Dohvati prethodni raspored
    //Dohvati Konobare
    //Dohvati smene
    popuniSidebar("admin")

    noviRaspored=structuredClone(prethodniRaspored);
    $("#save-btn").on('click',sendNoviRaspored)
    $("#table").hide()
    $("#save-btn").hide()
    $("#card-konobari").hide()
    $("#date-start").change(showTable)
    $("#date-end").change(showTable)
    initializeDrag()
    initKonobari()

})



