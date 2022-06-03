var reservationReqests = [
    {
        eventid:"1",
        idusers:"2",
        name:"Marko",
        surname:"Savic",
        ukupnaPotrosnja: "1000",
        noofseats:"8",
    },
    {
        eventid:"1",
        idusers:"3",
        name:"Marko",
        surname:"Savic",
        ukupnaPotrosnja: "1000",
        noofseats:"8",
    },
    {
        eventid:"1",
        idusers:"4",
        name:"Marko",
        surname:"Savic",
        ukupnaPotrosnja: "1000",
        noofseats:"8",
    },
    {
        eventid:"1",
        idusers:"5",
        name:"Marko",
        surname:"Savic",
        ukupnaPotrosnja: "1000",
        noofseats:"8",
    },
]

var approvedRequests = [
    {
        eventid:"1",
        idusers:"2",
        name:"Marko",
        surname:"Savic",
        noofseats:"8",
        tableIds:[1,2]
    },
]
let setups = [
    {
        idsetup:"123",
        name : "Postavka",
        tables:[
            {
                id:"1",
                name:"Separe1",
                noofseats: "8"
            },
            {
                id:"2",
                name:"Sto2",
                noofseats: "8"
            },

            
        ]
    },
    {
        name : "Postavka",
        idsetup: "123",
        tables:[
            {
                id:"3",
                name:"Separd4",
                noofseats: "8"
            },
            {
                id:"4",
                name:"Separe2",
                noofseats: "8"
            },
            
        ]
    },
]
events = [
    {   idevents : "1",
        name: 'Zurka 1',
        freeTableIds:[1,2]
    },
    {   idevents : "2",
        name: 'Zurka 2',
        freeTableIds:[1,2]
    },
    
]

function sort_by_key(array, key)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}
function getSubbarrayById(array,key,id){
    let ret_array=[]
    for(elem of array){
        if(elem[key]==id){
            ret_array.push(elem)
        }
    }
    return ret_array
}
function getElemByKey(array,key,id){
    for(elem of array){
        if(elem[key]==id){
            return elem
        }
    }
    return undefined
}

var selectedTables = [

]
var selectedEventId = null
var selectedUserId = null


function popuni(grid){
    grid.empty()
    for(let event of events){
        let reqests = getSubbarrayById(reservationReqests,"eventid",event.idevents)
        let approvedReq = getSubbarrayById(approvedRequests,"eventid",event.idevents)
        let eventDiv = $('<div class="event"></div>')
        let eventHeader = $('<div class="event-header">'+event.name+'</div>')
        let eventBody = $('<div class="event-body"></div>')
        let stigleRezervacije = $('<div class="card" id="stigle_rezervacije"></div>')
        let stigleRezNaslov = $('<div class="header-naslov">Pristigle rezervacije</div>')
        let stigleRezCardBody = $('<div class="card-body"></div>')
        let stigleRezTable = $('<table cellspacing="0"></table>')
        let stigleRezTableHead = $('<thead><tr><td>Korisnik</td><td>Broj Osoba</td><td>Opcije</td></tr></thead>')
        let stigleRezTableBody = $('<tbody></tbody>')
        for(let req of reqests){
            
            let tr = $('<tr></tr>')
            let tdIme = $('<td>'+req.name+' '+req.surname+'</td>')
            let tdSeats = $('<td>'+req.noofseats+'</td>')
            let tdButtons = $('<td class="td-buttons"></td>')
            let checkBtn = $('<div class="td-button las la-check">')
            let deleteBtn = $('<i class="td-button las la-times"></i>')
            let moreInfoBtn = $('<i class="td-button las la-ellipsis-h"></i>')
            checkBtn.on('click',()=>{
                    selectedEventId = event.idevents
                    selectedUserId = req.idusers
                    selectedTables=[]
                    fillPopUpAcceptReservation(event)
                }
                )
            deleteBtn.on('click',()=>{
                selectedEventId = event.idevents
                selectedUserId = req.idusers
                fillPopUpDeleteRequest(req.name+" "+req.surname)
            })
            moreInfoBtn.on('click',()=>{
                fillPopUpMoreInfoUser(req)
            })
            tdButtons.append(checkBtn).append(deleteBtn).append(moreInfoBtn)
            tr.append(tdIme).append(tdSeats).append(tdButtons)
            stigleRezTableBody.append(tr)
        }
        stigleRezTable.append(stigleRezTableHead).append(stigleRezTableBody)
        stigleRezCardBody.append(stigleRezTable)
        stigleRezervacije.append(stigleRezNaslov).append(stigleRezCardBody)
        eventBody.append(stigleRezervacije)


        let potvrdjeneRezervacije = $('<div class="card" id="potvrdjene_rezervacije"></div>')
        let potvrdjeneRezNaslov = $('<div class="header-naslov">Pristigle rezervacije</div>')
        let potvrdjeneRezCardBody = $('<div class="card-body"></div>')
        let potvrdjeneRezTable = $('<table cellspacing="0"></table>')
        let potvrdjeneRezTableHead = $('<thead><tr><td>Korisnik</td><td>Broj Osoba</td><td>Stolovi</td></tr></thead>')
        let potvrdjeneRezTableBody = $('<tbody></tbody>')
        for(let req of approvedReq){
            console.log("test")
            let tr = $('<tr></tr>')
            let tdIme = $('<td>'+req.name+' '+req.surname+'</td>')
            let tdSeats = $('<td>'+req.noofseats+'</td>')
            let tdButtons = $('<td class="td-buttons"></td>')
            let moreInfoBtn = $('<i class="td-button las la-ellipsis-h"></i>')
            moreInfoBtn.on('click',()=>{
                fillPopUpMoreInfoTables(req)
            })
            tdButtons.append(moreInfoBtn)
            tr.append(tdIme).append(tdSeats).append(tdButtons)
            potvrdjeneRezTableBody.append(tr)
        }

        potvrdjeneRezTable.append(potvrdjeneRezTableHead).append(potvrdjeneRezTableBody)
        potvrdjeneRezCardBody.append(potvrdjeneRezTable)
        potvrdjeneRezervacije.append(potvrdjeneRezNaslov).append(potvrdjeneRezCardBody)
        eventBody.append(potvrdjeneRezervacije)

        eventDiv.append(eventHeader).append(eventBody)
        grid.append(eventDiv)
    }
}
function findTableInSetup(stoId){
    for(let setup of setups){
        for(let table of setup.tables){
            console.log(stoId)
            console.log(table)
            if(table.idtable==stoId)return table
        }
    }
    return undefined
}
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

function fillPopUpAcceptReservation(event){
    let popup=$('#pop-up-content')
    popup.empty()
    let confrimReservationDiv = $('<div class="confirm-res-div"></div>')
    let stoloviHeader= $('<div class="stolovi-header">Slobodni stolovi</div>')
    let stolovi = $('<div id="stolovi"></div>')
    for(let stoId of event.freeTableIds){
        console.log(stoId)
        console.log(setups)
        let sto = findTableInSetup(stoId)
        console.log(sto)
        let stoDiv = $('<div class="sto"><h3>'+sto.name+'</h3><h3>'+sto.noofseats+' osoba</h3></div>')
        stoDiv.on('click',()=>{
            selectTable(stoDiv,sto)
        })
        stolovi.append(stoDiv)
    }
    let prihvatiButton = $('<button class="pop-up-button" id ="prihvati-rezervaciju">Prihvati rezervaciju</button>')
    prihvatiButton.prop('disabled', true);
    prihvatiButton.on('click',()=>{
        acceptRequest()
    })
    confrimReservationDiv.append(stoloviHeader).append(stolovi).append(prihvatiButton)
    popup.append(confrimReservationDiv)
    $('.hover_bkgr_fricc').show();
}
function selectTable(tableDiv,table){
    if(selectedTables.includes(table)){
        removeItemAll(selectedTables,table)
        tableDiv.removeClass("sto-selected")
        if(selectedTables.length==0)$("#prihvati-rezervaciju").prop('disabled', true);
    }else{
        selectedTables.push(table)
        tableDiv.addClass("sto-selected")
        $("#prihvati-rezervaciju").prop('disabled', false);
    }
    console.log(selectedTables)
}
function acceptRequest(){
    let data = {
        idevents: selectedEventId,
        idusers: selectedUserId,
        tables: JSON.stringify(selectedTables)
    }
    postDataWithSpinner("apiApproveReservation",data)//AJAX
}
function rejectRequest(){
    let data = {
        idevents: selectedEventId,
        idusers: selectedUserId,
    }
    postDataWithSpinner("apiDenyReservation",data)//AJAX
}
function fillPopUpDeleteRequest(user){
    let popup=$('#pop-up-content')
    popup.empty()
    let text = $('<div id="odbij-rezervaciju-tekst" class="pop-up-text">Da li zelite da odbijete rezervaciju za korisnika '+user+'?</div>')
    let button = $('<button class="pop-up-button">Potvrdi</button>')
    button.on('click',()=>{
        rejectRequest()
    })
    popup.append(text).append(button)
    $('.hover_bkgr_fricc').show();
}
function fillPopUpMoreInfoUser(user){
    let popup=$('#pop-up-content')
    popup.empty()
    let divKorisnik = $('<div class="pop-up-more-info-text">Korisnik</div>')
    let divName = $('<div class="pop-up-more-info-text">'+user.name+" "+user.surname+'</div>')
    let table = $('<table cellspacing="0" class="more-info-table"><tr><td>Ukupni zabelezeni trosak</td><td>'+user.ukupnaPotrosnja+'</td></tr></table>')
    popup.append(divKorisnik).append(divName).append(table)
    $('.hover_bkgr_fricc').show();
}
function fillPopUpMoreInfoTables(req){
    let popup=$('#pop-up-content')
    popup.empty()
    let confrimReservationDiv = $('<div class="confirm-res-div"></div>')
    let stoloviHeader= $('<div class="stolovi-header">Rezvisani stolovi</div>')
    let stolovi = $('<div id="stolovi"></div>')
    for(let stoId of req.tableIds){
        let sto = findTableInSetup(stoId.reservedtables)
        let stoDiv = $('<div class="sto"><h3>'+sto.name+'</h3><h3>'+sto.noofseats+' osoba</h3></div>')
        stoDiv.on('click',()=>{})
        stolovi.append(stoDiv)
    }
    
    confrimReservationDiv.append(stoloviHeader).append(stolovi)
    popup.append(confrimReservationDiv)
    $('.hover_bkgr_fricc').show();
}
async function postDataWithSpinner(url,data){
    closeModal()
    setSpinner()
    console.log(data)
    await postData(url,data)
    refresh()
    resetSpinner()
}
async function refresh(){
    reservationReqests = await $.get('apiReservationsNA')
    approvedRequests = await $.get('apiReservationsA')
    setups= await $.get('apiSetup')
    events= await $.get('apiFreeTables')
    console.log(events)
    popuni($("#grid"))
}
function closeModal(){
    $('.hover_bkgr_fricc').hide();
}

$(document).ready(
    ()=>{
        popuniSidebar("konobar")

        refresh()
         $('.popupCloseButton').click(function(){
             $('.hover_bkgr_fricc').hide();
         });
    }
)