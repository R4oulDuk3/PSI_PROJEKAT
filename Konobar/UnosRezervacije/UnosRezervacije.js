var data = [
    {  
        name: 'Zurka 1',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
        
    },
    {   
        name: 'Zurka 2',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
       
    },
    {   
        name: 'Zurka 3',
        description : ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
       
    }
]

var brojStola
var brojLjudiNaStolu

function popunideo1(body,data){
    body.empty()
    for (let dogadjaj of data){
        let tr = $('<a href="#" >'+dogadjaj.name+'</a>')
        body.append(tr)
    }
}

function zadrzi(){
    button.innerHTML = "test"
}

$(document).ready(
    ()=>{
        let body=$('#deo1')
        popunideo1(body,data)
    $('#mytable tr').on('click',function() { 
        brojStola= $(this).find("td").eq(0).html();      
        brojLjudiNaStolu = $(this).find("td").eq(1).html();   
        $(this).addClass('selected');
    });
    $('#deo1').on('click',function() { 
        var d=document.getElementById("deo1").value 
        alert(d)
        //zadrzi()
    });
    }
);

