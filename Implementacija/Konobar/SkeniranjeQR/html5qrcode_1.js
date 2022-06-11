var html5QrcodeScanner=null
var couponExample = {

    idcoupon:1,
    name: "Besplatno pivo",
    description : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.Eaque cupiditate perspiciatis quia',
    picture  :'assets/beer.jpg'
}

$(document).ready(
    ()=>{
        html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader", { fps: 10, qrbox: 500 }
            );
        // html5QrcodeScanner.render(onScanSuccess);
        returnToScan()
        $("#confirm-read").on('click',()=>{
            returnToScan()
        })
        $("#odbij").on('click',()=>{
            returnToScan()
        })
        $('#trosak').on('input',()=>{
            checkIfFilled()
        })
        $("#potvrdi").on('click',sendExpendature)
        popuniSidebar("konobar")

        // $("#test").on('click',async ()=>{
        //     await html5QrcodeScanner.clear()
        // })
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
    let data = {idusers:idUser, expendature:parseInt(trosak)}
    console.log(data)
    postData("apiCustomerExpendature",data)
    returnToScan()
    resetSpinner()
}
function returnToScan(){
        $('#qr-reader').show()
        $('#buy-coupon').hide()
        $('#new-expendature').hide()
        html5QrcodeScanner.render(onScanSuccess);
}
async function tryCouponBuy(request){
    idUser = request.iduser
    idCoupon = request.idcoupon
    setSpinner()
    //let res =await postData("apiBuyCoupon",{idusers:idUser,idcoupon:idCoupon})
    resetSpinner()
    res = couponExample
    return res
}

async function onScanSuccess(decodedText, decodedResult) {
    console.log(decodedText)
    let request = JSON.parse(decodedText)
    console.log(request)
    setSpinner()
    await html5QrcodeScanner.clear()
    console.log("Check")
    $('#qr-reader').hide()

    if(request.type=="unos_potrosnja"){
        idUser =request.iduser
        $('#new-expendature').show()
    }else{
        let response = await tryCouponBuy(request)
        $("#ret-msg-naslov").text(response.name)
        $("#ret-msg-desc").text(response.description)
        $('#buy-coupon').show()

    } 
    setTimeout(resetSpinner(),300)
}

