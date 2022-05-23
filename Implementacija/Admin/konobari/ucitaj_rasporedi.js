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
    },
    {
        idSmene: 1,
        konobarId: 2,
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
        if (konobar.id==id)return konobar
    }
    return null
}
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
    return today
}
function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
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
        let card = $('<div class="card"><div class="card-header"><h2>Raspored '+dateToString(date)+" - "+dateToString(new Date(date.getTime()+86400000*7))+'</h2><div class="buttons"><button class="sm-button"><span class="las la-sort-down" id="toggle-'+cnt+'"></span></button></div></div></div>')
        let cardBody = $('<div class="card-body"></div>')
        let tableResponsive = $('<div class="table-responsive"></div>')
        let table =$('<table><thead><tr><td>Smena</td><td>Ponedeljak</td><td>Utorak</td><td>Sreda</td><td>Cetvrtak</td><td>Petak</td><td>Subota</td><td>Nedelja</td></tr></thead></table>')
        let tbody = $('<tbody></tbody>')
        raspored.append(card)
        card.append(cardBody)
        cardBody.append(tableResponsive)
        tableResponsive.append(table)
        table.append(tbody)
        let toggle = $('#toggle-'+cnt)
        toggle.on('click',()=>{
            console.log('check')
            card.toggle()
        })
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
    for(info of raspored){
        let rasporedNum =  Math.floor(datediff(startDate, info.date)/7)
        let day = info.date.getDay()-1
        console.log("day")
        if(day==-1)day=6
        rasporediDatas[rasporedNum][info.idSmene][day].append($('<div>'+findKonobarById(info.konobarId).ime+'</div>'))
    }

}
$(document).ready(()=>{
    let grid = $('#grid')
    popuni(grid,raspored)
    //Dohvati raspored
    
})