var html5QrcodeScanner=null

$(document).ready(
    ()=>{
        $('#qr-reader').show()
        $('#buy-coupon').hide()
        $('#new-expendature').hide()
        $('#trosak').on('input',()=>{
            checkIfFilled()
        })
        $("#potvrdi").on('click',sendExpendature)
        popuniSidebar("konobar")
        html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", { fps: 10, qrbox: 500 }
            );
        html5QrcodeScanner.render(onScanSuccess);
        $("#test").on('click',async ()=>{
            await html5QrcodeScanner.clear()
        })
    }
)
var idUser=null
var idcoupon=null
function checkIfFilled(){
    console.log($("#trosak").val())
    if($("#trosak").val()==""){
        $("#potvrdi").prop("disabled",true)
    }else $("#potvrdi").prop("disabled",false)
}
function sendExpendature(){
    console.log($("#trosak").val())
    let trosak=$("#trosak").val()
    setSpinner()
    postData("url",{idusers:idUser,expendature:trosak})
    flag=true
    $('#qr-reader').show()
    $('#new-expendature').hide()
    html5QrcodeScanner.render(onScanSuccess);
    resetSpinner()
}

async function onScanSuccess(decodedText, decodedResult) {
    console.log(decodedText)
    let request = JSON.parse(decodedText)
    console.log(request)
    setSpinner()
    await html5QrcodeScanner.clear()
    console.log("Check")
    //$('#qr-reader').hide()

    if(request.type=="unos_potrosnja"){
        idUser =request.iduser
        $('#new-expendature').show()
    }else{
        idUser = request.iduser
        idCoupon = request.idcoupon
        let res =await postData("urlBuyCoupon",{idusers:idUser,idcoupon:idCoupon})
        $("#ret-msg").text(res)
    } 
    setTimeout(resetSpinner(),300)
}

