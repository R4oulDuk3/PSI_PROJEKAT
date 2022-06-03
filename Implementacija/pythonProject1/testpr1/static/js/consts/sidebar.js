const sidebar_links={
    admin:{
        items:[
            {
                link:"inventar",
                name:"Inventar",
                icon:"la-users"
            },
            {
                link:"stolovi",
                name:"Stolovi",
                icon:"la-users"
            },
            {
                link:"korisnici",
                name:"Konobar",
                icon:"la-users"
            },
            {
                link:"meni",
                name:"Meni",
                icon:"la-users"
            },
            {
                link:"dogadjaji",
                name:"Dogadjaji",
                icon:"la-users"
            },
            {
                link:"kuponi",
                name:"Kuponi",
                icon:"la-users"
            },
            /*{
                link:"izvestaj",
                name:"Izvestaj",
                icon:"la-users"
            },*/
        ]

    },
    konobar:{
        items:[
            {
                link:"QRkod",
                name:"Potrosnja i kuponi",
                icon:"la-users"
            },
            {
                link:"ZapocniSmenu.html",
                name:"Zapocinjanje smene",
                icon:"la-users"
            },
            {
                link:"biranjeSmene",
                name:"Biranje smene",
                icon:"la-users"
            },
            {
                link:"popis.html",
                name:"Popis",
                icon:"la-users"
            },
            {
                link:"DogadjajRezervacije.html",
                name:"Rezervacije za dogadjaje",
                icon:"la-users"
            },
        ]

    }
}


function popuniSidebar(tip){
    console.log(sidebar_links[tip].items)
    let sidebarMenu = $(".sidebar-menu").first()
    let ul =$("<ul></ul>")
    sidebarMenu.append(ul)

    for(let item of sidebar_links[tip].items){
        ul.append($('<li><a href="'+item.link+'"><span  class="las '+item.icon+'"></span><span>'+item.name+'</span></a></li>'))
    }
    let logout=$('<li><a href="'+"home.html"+'"><span  class="las '+"la-users"+'"></span><span>'+"Odjavljivanje"+'</span></a></li>')
    logout.on('click',async ()=>{
        await postData("apiOutUser",{})
    })
    ul.append(logout)
}

