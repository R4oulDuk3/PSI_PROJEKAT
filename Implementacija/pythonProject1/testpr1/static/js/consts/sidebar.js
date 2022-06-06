const sidebar_links={
    admin:{
        items:[
            {
                link:"inventar",
                name:"Inventar",
                icon:"la-warehouse"
            },
            {
                link:"stolovi",
                name:"Stolovi",
                icon:"la-chair"
            },
            {
                link:"korisnici",
                name:"Konobar",
                icon:"la-user-alt"
            },
            {
                link:"meni",
                name:"Meni",
                icon:"la-beer"
            },
            {
                link:"dogadjaji",
                name:"Dogadjaji",
                icon:"la-cocktail"
            },
            {
                link:"rasporedi.html",
                name:"Rasporedi",
                icon:"la-calendar"
            },
            {
                link:"kuponi",
                name:"Kuponi",
                icon:"la-percent"
            },
            {
                link:"DogadjajRezervacije.html",
                name:"Rezervacije",
                icon:"la-users"
            },
            {
                link:"izvestaj",
                name:"Izvestaj",
                icon:"la-info"
            },
        ]

    },
    konobar:{
        items:[
            {
                link:'ZapocniSmenu.html',
                name:"Zapocinjanje smene",
                icon:"la-clock"
            },
            {
                link:"QRkod",
                name:"Skeniranje QR koda",
                icon:"la-qrcode"
            },
            {
                link:"DogadjajRezervacije.html",
                name:"Rezervacije",
                icon:"la-users"
            },
            {
                link:"rasporedi_konobar",
                name:"Raspored",
                icon:"la-calendar"
            },
            {
                link:"popis.html",
                name:"Popis",
                icon:"la-pen"
            },
            {
                link:"biranjeSmene",
                name:"Biranje Smene",
                icon:"la-calendar-plus"
            },
        ]

    }
}


async function popuniSidebar(tip){
    console.log(sidebar_links[tip].items)
    let sidebarMenu = $(".sidebar-menu").first()
    let ul =$("<ul></ul>")
    sidebarMenu.append(ul)

    for(let item of sidebar_links[tip].items){
        ul.append($('<li><a href="'+item.link+'"><span  class="las '+item.icon+'"></span><span>'+item.name+'</span></a></li>'))
    }
    let logout=$('<li><a href="'+"#"+'"><span  class="las '+"la-sign-out-alt"+'"></span><span>'+"Odjavljivanje"+'</span></a></li>')
    logout.on('click',async ()=>{

        await $.get("apiOutUser")
        window.location.href = 'home.html'
    })
    let user =await $.get("apiCheckLogInUser")

    let user_name= $(".user-wrapper div h4").text(user.name+" "+user.surname)
    let user_type= $(".user-wrapper div small").text(tip)

    ul.append(logout)
}
//apiOutUser

