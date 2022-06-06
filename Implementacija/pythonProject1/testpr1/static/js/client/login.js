$(document).ready(function(){

    $("#btn").click(async function(){
      await loguj();
    })
  
  })

  async function loguj() {
    
    let json = new Object();
    json.email = $("#mail").val();
    json.password = $("#pass").val();
    let link = await postData("apiLogIn",json);

    console.log(link);

    window.location.replace(link);
    console.log("posle");
  }