let flag1 = 0;
let flag2 = 0;
let flag3 = 0;
let numPhone=0;
function validate(){
  flag1 = 0;
  flag2 = 0;
  flag3 = 0;
  let pass = document.getElementById("pass");
  let conf = document.getElementById("cmf");
  if(conf.value != "" && pass.value != ""){
    if (conf.value != pass.value) {
      alert("Lozinka se razlikuje od potvrdjene");
      
    }
    else{
      flag1 = 1;
      
    }
  }
  if (document.getElementById("legal").checked == true) {
    flag2 =1;
    
  }
  if (fillOut()) {
   flag3 = 1;
   
  }
  if(flag1 && flag2 && flag3){
    document.getElementById("regbut").disabled = false;
    document.getElementById("regbut").classList.remove("dis");
    document.getElementById("regbut").classList.add("val");
  }
  else{
    document.getElementById("regbut").disabled = true;
    document.getElementById("regbut").classList.remove("val");
    document.getElementById("regbut").classList.add("dis");
  }
}

function fillOut() {
  if($("#ime").val() == "" || $("#prez").val() == "" || $("#mail").val()=="" || $("#pass").val() == "" || $("#cmf").val()=="" || $("#legal").checked == false )
    return false;
  return true;
}

async function registruj(){
  if(document.getElementById("telNum").value == null){
    numPhone = "";
  }
  else{
    numPhone=document.getElementById("telNum").value;
  }
  let json = new Object();
  json.name = $("#ime").val();
  json.surname = $("#prez").val();
  json.email = $("#mail").val();
  json.password =  $("#pass").val();
  json.phone = numPhone;
  //var data = JSON.stringify(json);
  await postData("apiCreateUser",json);
}

$(document).ready(function(){

  $("#ime").change(function(){validate()});
  $("#prez").change(function(){validate()});
  $("#mail").change(function(){validate()});
  $("#pass").change(function(){validate()});
  $("#cmf").change(function(){validate()});
  $("#legal").change(function(){validate()});
  $("#regbut").click(function(){
    registruj();
    console.log("ovde")
  })

})