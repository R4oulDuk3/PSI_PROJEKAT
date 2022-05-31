$(document).ready(function(){

    $("#btn").click(function(){
      loguj();
    })
  
  })

  function loguj() {
    
    let json = new Object();
    json.username = $("#mail").val();
    json.password = $("#pass").val();
    postData("apiLogIn",json);
      
  }