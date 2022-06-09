
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
        end:"01:00:00" 

    },{
        idShift: 7,
        name: "Treca smena",
        start:"20:00:00",
        end:"01:00:00" 

    }
]
var schedule = [

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
async function proveri(body){
    let posalji=[]
    body.empty()
    let iCnt=0
    var imaSmena=0
    for(let smena of data){ //ako moze da zapocne smenu
        let k=pozovi(smena.end)
        let p=pozovi(smena.start)
        let t=pozovi(trVr)
        let tp=parseInt(t / 1000)
        //lert("Kraj " +k + " Pocetak " + p + " Trenutno " + t  + " Prvi broj tr " + tp)
        if((p<k && t>p && t<k) || (k<p && ((tp==0 && t<p && t<k) || (tp!=0 && t>p && t>k))))  {
                imaSmena++;
                 let pS=napraviVreme(smena.start)
                 let kS=napraviVreme(smena.end)
                let tr=$('<div class="card-single" id='+smena.idshift+'><div><h1> '+"Smena "+smena.idshift + '</h1><br><h3 style="text-align: center;">'+smena.start+'-'+smena.end+ '</h3></div><div><button class="button" id="button'+smena.idshift+'"><b>Zapocni smenu</b></button><button class="buttonR" id="buttonR'+smena.idshift+'"><b>Zavrsi smenu</b></button></div></div>')
                body.append(tr)
                nema=true
                $("#button"+smena.idshift).on('click',async ()=>{
                    $('.buttonR').prop('disabled', false)
                    $('.button').prop('disabled', true)
                    //boji
                    // $('.button').removeClass('obojZeleno')
                    // $('.buttonR').removeClass('obojSivo')
                    // $('.button').addClass('obojSivo')
                    // $('.buttonR').addClass('obojCrveno')
                    //  alert("Unos smene")
                    $("#button"+smena.idshift).css("background-color","gray");
                    $("#buttonR"+smena.idshift).css("background-color","red");

                      //console.log("#button"+smena.idShift)
                    //  alert("Ovo se obojilo")
                     let s = {
                        idShift:smena.idshift,
                        vremePocetka:trVr,
                    }

                     await postData('apiStart', s)
                 })
                 $("#buttonR"+smena.idshift).on('click',async ()=>{
                    $('.buttonR').prop('disabled', true)
                    $('.button').prop('disabled', false)
                    $("#buttonR"+smena.idshift).css("background-color","gray");
                    $("#button"+smena.idshift).css("background-color","yellowgreen");
                    // $('.button').removeClass('obojSivo')
                    // $('.buttonR').removeClass('obojCrveno')
                    // $('.button').addClass('obojZeleno')
                    // $('.buttonR').addClass('obojSivo')
                    let s = {
                        idShift:smena.idshift,
                        vremeKraja:trVr,
                    }

                     await postData('apiEnd', s)
                })

            }else  {
                flagRano=true

               
            }
            }
            if(!nema){ let tr=$('<div class="card-single"><div><h1> '+ "Trenutno ne postoje smene" + '</h1><br></div></div>')
                body.append(tr)
    }

}
function getDate(date,time){
    let timeInfo = time.split(":")
    for(let i=0;i<timeInfo.length;i++){
        timeInfo[i]=parseInt(timeInfo[i])
    }
    console.log(timeInfo)
    //console.log(date)
    date = new Date(date)
    //console.log(date)
    if(timeInfo[0]<7){
        date = new Date(date.getTime() + 86400000)
    }
    date.setHours(timeInfo[0])
    date.setMinutes(timeInfo[1])
    date.setSeconds(timeInfo[2])
    date.setMilliseconds(0)
    return date
}
function hoursBetweenDates(date1,date2){
    let hours = Math.abs(date1 - date2) / 36e5
    return hours
}
function toIsoStringDate(date){
    return date.getFullYear() + '-' +
           ('0'+ (date.getMonth()+1)).slice(-2) + '-' +
           ('0'+ date.getDate()).slice(-2);
}

async function popuni(body){
    body.empty()
    let noShifts=$('<div class="card-single"><div><h1> '+ "Trenutno nema nijedna smena za tebe. U sekciji 'Raspored' mozes da vidis kad ti je radno vreme." + '</h1><br></div></div>')
    let currTime = new Date()
    let permit = null
    for(let smena of shifts){
        let start = getDate(currTime,smena.start)
        let end = getDate(currTime,smena.end)
        console.log(start)
        console.log(currTime)
        console.log(end)
        let currTimeLate = new Date(currTime.getTime() +86400000)
        if((start<currTime && currTime<end) || (start<currTimeLate && currTimeLate<end)){
            console.log("ima smena")
            for(let schedule of schedules){
                if(schedule.shift == smena.idshift){
                    console.log("idschedule "+schedule.idschedule)
                    //console.log(schedule.day)
                    let sDate = new Date(new Date(schedule.day))
                    console.log(sDate)
                    let start = getDate(sDate,smena.start)
                    let end = getDate(sDate,smena.end)
                    console.log(start)
                    console.log(currTime)
                    console.log(end)
                    if(start<currTime && currTime<end){
                        console.log("ima raspred")
                        console.log(schedule.started)
                        if(schedule.started==null){
                            let shiftDiv = $(
                            '<div class="card-single">' +
                            '<div>' +
                            '<h1>Smena '+smena.idshift+'</h1>' +
                            '<br>' +
                            '<h3 style="text-align: center;">'+smena.start+" - "+smena.end+'</h3>\n' +
                            '</div>' +
                            ' <div>' +
                            '<button class="button" id="zapocni-smenu"><b>Zapocni smenu</b></button>\n'+
                            '</div>' +
                            '</div>')
                            body.append(shiftDiv)
                            $("#zapocni-smenu").on('click',async ()=>{
                                console.log("KLIK")
                                console.log(schedule)
                                let start = new Date()
                                let end = getDate(start,smena.end)
                                // console.log(start)
                                end = end
                                console.log(end)
                                schedule.started=start
                                schedule.ended = end
                                console.log(schedules)
                                console.log(hoursBetweenDates(end,start))
                                let waiterWorkHours = {
                                    day: new Date().toISOString(),
                                    hours:hoursBetweenDates(end,start)
                                }
                                let waiterPermit = {
                                    day: new Date(end.getTime() + 60000*60*2).toISOString(),
                                }
                                let schedule_send = {
                                    idschedule: schedule.idschedule,
                                    started: schedule.started.toISOString(),
                                    ended: schedule.ended.toISOString(),
                                }
                                console.log(schedule_send)
                                console.log(waiterPermit)
                                setSpinner()
                                await postData("apiPostWaiterWorkHours",waiterWorkHours)
                                await postData("apiPostWaiterPermit",waiterPermit)
                                await postData("apiStartSchedule",schedule_send)
                                popuni(body)
                                resetSpinner()
                            })
                            return
                        }else{
                            let shiftDiv = $(
                            '<div class="card-single">' +
                            '<div>' +
                            '<h1>Smena '+smena.idshift+'</h1>' +
                            '<br>' +
                            '<h3 style="text-align: center;">'+smena.start+" - "+smena.end+'</h3>' +
                            '</div>' +
                            ' <div>' +
                            '<h3 style="text-align: center;">'+"Smena je zapoceta"+'</h3>'+
                            '</div>' +
                            '</div>')
                            body.append(shiftDiv)
                            return
                        }

                    }

                }
            }

        }
    }
    body.append(noShifts)
}


function napraviBod(data){

    for(let s of data){
        let k=pozovi(s.end)
        let p=pozovi(s.start)
        let t=pozovi(trVr)
        let tp=parseInt(t / 1000)
    }
}
var shifts=[]
var schedules=[]
$(document).ready(
    async ()=>{
        popuniSidebar("konobar")
        let body=$('#main')
        shifts = await $.get('apiShift')
        schedules= await $.get('apiMySchedule')
        console.log(schedules)
        for(let schedule of schedules){
            // schedule.day= new Date(schedule.day)
            // var userTimezoneOffset = schedule.day.getTimezoneOffset() * 60000;
            // schedule.day = new Date(schedule.day.getTime()-userTimezoneOffset)
            schedule.day = new Date(Date.parse(schedule.day))
        }
        console.log(shifts)
        console.log(schedules)
        popuni(body)
        //napraviBod(smene)
        
    }

);