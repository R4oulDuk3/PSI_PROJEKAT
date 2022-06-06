


var s= new Date()
var mesec=s.getMonth() // koji je mesec brojcano
var nedelja=s.getDay() //koji je dan u nedelji
var date=s.getDate() // koji je dan u mesecu
var Od=0
var Do =0

var smene=[]
var word
var word2


function dateToString(day ){
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();
    today = dd + '/' + mm + '/' + yyyy;
    return today
}

function popuniDatum(naslov){
    naslov.empty()
    start = new Date(); // get current date
    end  = new Date(start.getTime()+ 86400000*6) // last day is the first day + 6

    removeHours(start);removeHours(end)
    let naslov_h2 = $('<h2>'+dateToString(start)+" - "+dateToString(end)+'</h2>')
    naslov.append(naslov_h2)
    table_rows =[]
    for(let smena of shifts){
        console.log("check")
        table_rows.push($("<tr></tr>"))
    }
    let header_row= $("<tr></tr>")
    let footer_row =$("<tr></tr>")
    $("#thead").append(header_row)
    $("#foot").append(footer_row)
    let i =0;
    for(let curr = new Date(start);curr<=end;curr=new Date(curr.getTime()+ 86400000)){
        removeHours(curr)
        console.log(curr)
        header_row.append('<td>'+ curr.getDate()+' </td>')
        footer_row.append('<td>'+ daysOfWeek[curr.getDay()]+' </td>')
        i++;
        for(let j=0; j<shifts.length;j++){
            let td = $('<td id="'+"td"+i+""+j+'">'+(j+1)+'</td>')
            let shiftid = j+1
            let date = new Date(curr)
            td.on('click',()=>{
                togglePrefrencePick(i,shiftid,td,date)
            })
            table_rows[j].append(td)
        }
    }
    for(let row of table_rows){
        console.log("check")
        $("#body").append(row)
    }
}
function togglePrefrencePick(i,shiftid,td,date){

    let preference = preferences.find(
        (preference)=>{

            return preference.day.getTime()==date.getTime()&&preference.preferedshift==shiftid
        })
    if(preference==null){
        preferences.push({
            day:new Date(date),
            waiter: idWaiter,
            preferedshift: shiftid
        })
        td.removeClass("selected")
        td.addClass("selected")
    }else{
        removeElemFromArray(preference,preferences)
        td.addClass("selected")
        td.removeClass("selected")

    }
    console.log(preferences)
}
function removeElemFromArray(elem,array){
    const index = array.indexOf(elem);
    if (index > -1) {
        console.log("removed")
    array.splice(index, 1); // 2nd parameter means remove one item only
}
}
function removeHours(date){
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
}

var daysOfWeek= ["ned","pon","ut","sre","cet","pet","sub"]

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

async function finalnoSlanje(){
    let preferences_send = []
    for(let pref of preferences){
        preferences_send.push({
            day: new Date(pref.day).toISOString(), //new Date(pref.day.toString().split('GMT')[0]+' UTC').toISOString().split('.')[0],
            preferedshift:pref.preferedshift,
            waiter:pref.waiter
        })
    }
    console.log(preferences_send)
    let jsmene = {svesmene:JSON.stringify(preferences_send)}
    setSpinner()
    await postData("apiSetPreference",jsmene)
    resetSpinner()
    console.log("here")
}
function popuniPreference(preference){
    for(let pref of preference){
        let i = datediff(start,pref.day)+1
        let j = pref.preferedshift-1
        console.log("td"+i+""+j)
        $("#td"+i+""+j).addClass("selected")
    }
}

var shifts = null
var schedule =null
var preferences = null
var idWaiter=null
var table_rows=null
var start=null
var end=null
$(document).ready(
    async ()=>{
        popuniSidebar("konobar")
        let datum=$('#naslov')
        shifts = await $.get("apiShift")
        schedule = await $.get("apiSchedule")
        preferences = await $.get("apiMyPreference")
        idWaiter = await $.get("apiGetId")
        for(let pref of preferences){
            pref.day = new Date(pref.day)
        }
        console.log(shifts)
        console.log(schedule)
        console.log(preferences)
        popuniDatum(datum)
        popuniPreference(preferences)


       $('#sacuvaj').on('click',function() {
        finalnoSlanje()
    });
    }
);
