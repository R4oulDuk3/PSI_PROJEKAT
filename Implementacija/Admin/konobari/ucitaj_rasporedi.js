var raspored=[
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

function findLatestDate(date,raspored){
    for(info of raspored){
        if(date<info.date){
            date=info.date
        }
    }
    return date
}
function dateToString(date){
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    today = dd + '/' + mm + '/' + yyyy;
    return date
}


$(document).ready(()=>{
    let startDate = new Date()
    while(startDate.getDay()!=1){
        startDate = new Date(date.getTime() - 86400000)
    }
    let grid = $('#grid')
    date = new Date(startDate)
    let cnt=0;
    let tableRows=[]
    fo
    let raspored = $('<div class="raspored"><div class="card"><div class="card-header"><h2>Raspored'+dateToString(date)+" - "+dateToString(new Date(date.getTime()+86400000))+'</h2><div class="buttons"><button class="sm-button"><label for="kat-toggle"><span class="las la-sort-down" "></span></label></button></div></div><input type="checkbox" name="" id="kat-toggle"><div class="card-body"><div class="table-responsive"><table><thead><tr><td>Smena</td><td>Ponedeljak</td><td>Utorak</td><td>Sreda</td><td>Cetvrtak</td><td>Petak</td><td>Subota</td><td>Nedelja</td></tr></thead><tbody></tbody></table></div></div></div></div>')
    while(date!=endDate){
        
    }
    //Dohvati raspored
    
})