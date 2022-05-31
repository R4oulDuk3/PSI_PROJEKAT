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
            {
                link:"izvestaj",
                name:"Izvestaj",
                icon:"la-users"
            },
        ]

    },
    konobar:[]
}


function popuniSidebar(tip){
    let sidebarMenu = $(".sidebar-menu").first()
    let ul =$("<ul></ul>")
    sidebarMenu.append(ul)
    for(let item of sidebar_links[tip].items){
        ul.append($('<li><a href="'+item.link+'"><span  class="las '+item.icon+'"></span><span>'+item.name+'</span></a></li>'))
    }
}

