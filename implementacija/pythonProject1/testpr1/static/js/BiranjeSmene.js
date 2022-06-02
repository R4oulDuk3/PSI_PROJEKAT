


var s= new Date()
var mesec=s.getMonth() // koji je mesec brojcano
var nedelja=s.getDay() //koji je dan u nedelji
var date=s.getDate() // koji je dan u mesecu
var Od=0
var Do =0

var smene=[]
var word
var word2

function dajMesec(m,s){
    switch (m) {
        case 0:
            s=31;
            return "Januar"
            break;
        case 1:
            s=28;
            return "Februar"
            break;
        case 2:
            s=31;
            return "Mart"
            break;
        case 3:
            s=30;
            return "April"
            break;
        case 4:
            s=31;
            return "Maj"
            break;
        case 5:
            s=30;
            return "Jun"
            break;
        case 6:
            s=31;
            return "Jul"
            break;
        case 7:
            s=31;
            return "Avgust"
            break;
        case 8:
            s=30;
            return "Septembar"
            break;
        case 9:
            s=31;
            return "Oktobar"
            break;
        case 10:
            s=30;
            return "Novembar"
            break;
        case 11:
            s=31;
            return "Decembar"
            break;
        default:
            break;
    }
}


function promeni(m){
    switch (m) {
        case "January" :
            return '01';
            break;
        case "February":
            return '02'
            break;
        case "March":
            return '03'
            break;
        case "April":
            return '04'
            break;
        case "May":
            return '05'
            break;
        case "June":
            return '06'
            break;
        case "July":
            return '07'
            break;
        case "August":
            return '08'
            break;
        case "September":
            return '09'
            break;
        case "October":
            return '10'
            break;
        case "November":
            return '11'
            break;
        case "December":
            return '12'
            break;
        default:
            break;
    }

}

function popuniDatum(body,head){
    body.empty()
    head.empty()
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstday = new Date(curr.setDate(first)).toUTCString();
    var lastday = new Date(curr.setDate(last)).toUTCString();
    const myArray = firstday.split(" ");
     word = myArray[1];

    const myArray2 = lastday.split(" ");
     word2 = myArray2[1];

    //alert(firstday + " - " + lastday)
    let tr = $('<h2>'+dajMesec(mesec)+'</h2><h2>'+word+' - ' +word2 + '</h2>')
    body.append(tr)

    for(var f=first;f<=last;f++){
        let currr=new Date()
        let fd = new Date(currr.setDate(f)).toUTCString();
        const m = fd.split(" ");
        let w = m[1];
        let td=$('<td>'+w+'</td>')
        head.append(td)
    }
}

function nadjiDan(m){
    switch (m) {
        case "sun" :
            return 0;
            break;
        case "mon":
            return 1
            break;
        case "tue":
            return 2
            break;
        case "wed":
            return 3
            break;
        case "thr":
            return 4
            break;
        case "fri":
            return 5
            break;
        case "sat":
            return 6
            break;
        default:
            break;
    }
}



function dajDatum(id){
    //alert("usla u dajDatum")
    var cur = new Date; // get current date
    var firs = cur.getDate() - cur.getDay(); // First day is the day of the month - the day of the week
    let d=nadjiDan(id)
    var las= firs + d;
    var lasday = new Date(cur.setDate(las)).toUTCString();
    return lasday
}

function posalji(tekst,id,obj){
    let datum=dajDatum(id)
    let w1
    let w2 
    let w3 
    let flag=false
    const myA = datum.split(" ");
    w1=myA[1];
    w2=myA[2];
    w3=myA[3];
    let i=0
    let br
    //alert("Izabrana je smena " + tekst + " na datum " +datum)
    for(let smena of smene){ //prolazim kroz smene i gledam da li sam je vec dodala i deselektuj
        if(smena.RedniBrojSmene==tekst && smena.Dan==w1 && smena.Mesec==w2 && smena.Godina==w3){
          // $(obj).addClass('deselected') //deselektuj
            alert("Vec si dodala treba da je izbacis i odselektujes")
            flag=true
             br=i;
             smene.splice(br,1)
            //smena.pop()
        }
        i++;
    }
    
    //smene.splice(br,1)
    let mes=promeni(w2)
    let posaljiDatum=w3+"-"+mes+"-"+w1
    alert(posaljiDatum)
    if(!flag){ //ako nije dodata dodaj i selectuj je
        //$(obj).addClass('selected')
        smene.push({
        preferedshift:tekst,
        day:posaljiDatum
        })
    }

    alert("Sad su u nizu ")
        for(let s of smene){
            alert("Smena" + s.RedniBrojSmene + " " + s.Dan + " " + s.Mesec)
        }
    return flag
} 


function finalnoSlanje(){
    let jsmene = {svesmene:JSON.stringify(smene)}
    postData("apiSetPreference",jsmene)
    console.log("here")
}

$(document).ready(
    ()=>{
        popuniSidebar("konobar")
        let datum=$('#naslov')
        let head=$('#thead')
        //let bodyPopUp=$('#bodyPopUp')
        popuniDatum(datum,head)
        $('#smena tr').each( function(){
            $('td',this).on('click',function(){
                let f=$(this).attr("id")
               // alert(f)
               let fl
               if($.isNumeric($(this).text())) fl= posalji($(this).text() ,$(this).attr('id') ,this)
               if(!fl){
                   $(this).addClass('selected');
                   $(this).removeClass('deselected')
               }else{
                   $(this).addClass('deselected');
                   $(this).removeClass('selected')
               }
                // alert($(this).text())   
                // alert($(this).attr('id'));
           });
       
       });

       $('#sacuvaj').on('click',function() {
        console.log("usao")
        finalnoSlanje()
    });
    }
);
