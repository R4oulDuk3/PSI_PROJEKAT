const sidebar_links={
    admin:{
        items:[
            {
                link:"../inventar/inventar.html",
                name:"Inventar",
                icon:"la-users"
            },
            {
                link:"../stolovi/stolovi.html",
                name:"Stolovi",
                icon:"la-users"
            },
            {
                link:"../konobari/konobari.html",
                name:"Konobar",
                icon:"la-users"
            },
            {
                link:"../meni/meni.html",
                name:"Meni",
                icon:"la-users"
            },
            {
                link:"../dogadjaji/dogadjaji.html",
                name:"Dogadjaji",
                icon:"la-users"
            },
            {
                link:"../kuponi/kuponi.html",
                name:"Kuponi",
                icon:"la-users"
            },
            {
                link:"../izvestaji/izvestaji.html",
                name:"Izvestaj",
                icon:"la-users"
            },
        ]

    },
    konobar:{
        items:[
            {
                link:"",
                name:"Biranje smene",
                icon:"la-users"
            },
            {
                link:"",
                name:"Stolovi",
                icon:"la-users"
            },
            {
                link:"",
                name:"Konobar",
                icon:"la-users"
            },
            {
                link:"",
                name:"Meni",
                icon:"la-users"
            },
            {
                link:"",
                name:"Dogadjaji",
                icon:"la-users"
            },
            {
                link:"",
                name:"Kuponi",
                icon:"la-users"
            },
            {
                link:"",
                name:"Izvestaj",
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
}

