


var s= new Date()
var mesec=s.getMonth() // koji je mesec brojcano
var nedelja=s.getDay() //koji je dan u nedelji
var date=s.getDate() // koji je dan u mesecu
var Od=0
var Do =0


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

function proveriDatumOd(m,dn,dm){
    let s
    let ss=dajMesec(m-1,s)
    Od=s-dn
}
function proveriDatumDo(m,dn,dm){
    let s
    let ss=dajMesec(m,s)
    let preostalih=ss-dm //u ovom mesecu imam jos ovoliko dana
    //7-preostalih
    Od=7-preostalih
}

function dajNedelju(danUnedelji,danUmesecu,mesec){
        Od=danUmesecu-danUnedelji+1
        if(Od<0)proveriDatumOd(mesec,danUnedelji,danUmesecu)
        Do=danUmesecu+7-danUnedelji
        let s
        let ss=dajMesec(mesec,s)
        if(Do>s)proveriDatumDo(mesec,danUmesecu,danUnedelji)
}

var word
var word2
function popuniDatum(body){
    body.empty()
    alert(dajMesec(mesec))
    
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
    alert(word + " - " + word2)
    let tr = $('<h2>'+dajMesec(mesec)+'</h2><h2>'+word+' - ' +word2 + '</h2>')
    body.append(tr)
}


$(document).ready(
    ()=>{
        let datum=$('#naslov')
        //let bodyPopUp=$('#bodyPopUp')
        popuniDatum(datum)
        
        
    }
);
