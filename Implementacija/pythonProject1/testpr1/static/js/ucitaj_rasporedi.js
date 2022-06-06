var raspored=[
    {
        shift : 1,
       weighter : 1,
       day  : new Date(2022,5,2)
    },
    {
        shift: 1,
       weighter: 1,
       day  : new Date(2022,5,2)
    },
    {
        shift: 1,
       weighter: 1,
       day  : new Date(2022,5,1)
    },
    {
        shift: 1,
        weighter: 2,
        day  : new Date(2022,5,1)
     }
]
var smene = [
    {
        idshift :0,
        start : 8,
        end : 12
    },
    {
        idshift :1,
        start:12,
        end :20,
    },
    {
        idshift :2,
        start:20,
        end :4
    }
]
var konobari = [
    {
        id: 1,
        ime: "Marko Savic",
        telefon: '+38162626262',
        email: 'marko-savic@gmail.com',
        korisnickoIme: 'mareSavke',
        imagePath:'../assets/konobar.jpg'
    },
    {   id: 2,
        ime: "Nevenka Nevenkic",
        telefon: '+38162626262',
        email: 'nevenkaNevenkic@gmail.com',
        korisnickoIme: 'nenaNena',
        imagePath:'../assets/konobarka.webp'
    }
]
function findKonobarById(id){
    for(konobar of konobari){
        if (konobar.idusers==id)return konobar
    }
    return null
}
function findLatestDate(day ,raspored){
    for(info of raspored){
        if(day <info.day ){
            day =info.day 
        }
    }
    return day 
}
function dateToString(day ){
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();
    today = dd + '/' + mm + '/' + yyyy;
    return today
}
function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24))+1;
}
function popuni(grid,raspored){
    let startDate = new Date()
    while(startDate.getDay()!=1){
        startDate = new Date(startDate.getTime() - 86400000)
    }

    let date = new Date(startDate)
    let endDate = findLatestDate(startDate,raspored)
    let rasporediDatas=[]
    let cnt=0
    while(date<endDate){
        let rasporedDatas=[]
        let tableRows=[]
        let raspored = $('<div class="raspored"></div>')
        let card = $('<div class="card"></div>')
        let card_header = $('<div class="card-header"><h2>Raspored '+dateToString(date)+" - "+dateToString(new Date(date.getTime()+86400000*7))+'</h2></div>')
        let buttons = $('<div class="buttons"><button class="sm-button"><span class="las la-sort-down" id="toggle-'+cnt+'"></span></button></div>')
        card_header.append(buttons)
        let cardBody = $('<div class="card-body"></div>')
        let tableResponsive = $('<div class="table-responsive"></div>')
        let table =$('<table><thead><tr><td>Smena</td><td>Ponedeljak</td><td>Utorak</td><td>Sreda</td><td>Cetvrtak</td><td>Petak</td><td>Subota</td><td>Nedelja</td></tr></thead></table>')
        let tbody = $('<tbody></tbody>')
        raspored.append(card)
        card.append(card_header).append(cardBody)
        cardBody.append(tableResponsive)
        tableResponsive.append(table)
        table.append(tbody)
        buttons.on('click',()=>{cardBody.toggle(300)})
        cnt++;
        
        for(let i =0; i< smene.length;i++){
            rasporedRow=[]
            tableRows.push($("<tr><td>"+(i+1)+"</td></tr>"))
            tbody.append(tableRows[i])
            for(let j=0;j<7;j++){
                let tr = $("<td></td>")
                tableRows[i].append(tr)
                rasporedRow.push(tr)
            }
            rasporedDatas.push(rasporedRow)
        }
        rasporediDatas.push(rasporedDatas)
        date = new Date(date.getTime() + 7*86400000)
        grid.append(raspored)
    }
    console.log(rasporediDatas)
    for(info of raspored){
        console.log(startDate)
        console.log(info.day)
        let rasporedNum =  Math.floor(datediff(startDate, info.day)/7)
        let day = info.day.getDay()-1
        console.log(day)
        if(day==-1)day=6
        console.log(rasporedNum)
        console.log(info.shift)
        rasporediDatas[rasporedNum][info.shift-1][day].append($('<div>'+findKonobarById(info.waiter).name+'</div>'))
    }

}

$(document).ready(async()=>{
    let role = await $.get("apiGetRole")
    popuniSidebar(role)
    let grid = $('#grid')
    raspored = await $.get("apiSchedule") //AJAX
    smene = await $.get("apiShift")// AJAX
    konobari = await $.get("apiWaiter") //AJAX

    console.log(raspored)
    let copy = JSON.parse(JSON.stringify(raspored))
    console.log(copy)
    for(let i=0; i<raspored.length;i++){
        raspored[i].day =new Date( new Date(copy[i].day))
    }
    console.log(raspored)
    popuni(grid,raspored)
    
})