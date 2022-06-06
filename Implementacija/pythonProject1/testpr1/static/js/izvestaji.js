const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Data',
      backgroundColor: '#B547C1',
      borderColor: '#B547C1',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  const config2 = {
    type: 'bar',
    data: data,
    options: {}
  };
  const config3 = {
    type: 'doughnut',
    data: data,
    options: {}
  };
  const config4 = {
    type: 'line',
    data: data,
    options: {}
  };

  var prodatiArtikli = []
  var customerExp = []
var waiterHours =[]
  function kreirajChart(name,labelsC,dataC,num){

    $("#card-"+num).show()
    let chart = $('#myChart'+num)
    const config = {
      type: 'bar',
      data: {
        labels: labelsC,
        datasets: [{
          label: name,
          backgroundColor: '#B547C1',
          borderColor: '#B547C1',
          data: dataC,
        }]
      },
      options: {}
    };
    let myChart = new Chart(chart,config)
  }
function kreirajArtikalChart(){
      let  artikliPotrosnja ={

    }
    for(artikal of prodatiArtikli){
      if(artikal.name in artikliPotrosnja){
        artikliPotrosnja[artikal.name]+=parseInt(artikal.amount)
      }else{
        artikliPotrosnja[artikal.name]=parseInt(artikal.amount)
      }
    }
    let labels= []
    let data =[]

    Object.entries(artikliPotrosnja).forEach(([key, value]) => {
      console.log(key, value);
      labels.push(key)
      data.push(value)
   });
    console.log(labels)
    console.log(data)
   kreirajChart("Kolicina potrosene robe",labels,data,1)
}
function kreirajWaiterHoursChart(){
      let konobariSati ={

    }
    for(let info of waiterHours){
      if((info.waiterInfo + " "+info.waiter)  in konobariSati){
        konobariSati[(info.waiterInfo + " "+info.waiter)]+=parseFloat(info.hours)
      }else{
        konobariSati[(info.waiterInfo + " "+info.waiter)]=parseFloat(info.hours)
      }
    }
    let labels= []
    let data =[]

    Object.entries(konobariSati).forEach(([key, value]) => {
      console.log(key, value);
      labels.push(key)
      data.push(value)
   });
    console.log(labels)
    console.log(data)
   kreirajChart("Radno vreme radnika",labels,data,3)
}
function kreirajPotrosnjaChart(){
   let  korisniciPotrosnja = {}
   for(let ce of customerExp){
    if((ce.customer+" "+ce.userInfo) in korisniciPotrosnja){
      korisniciPotrosnja[(ce.customer+" "+ce.userInfo)]+=parseInt(ce.amount)
    }else{
      korisniciPotrosnja[(ce.customer+" "+ce.userInfo)]=parseInt(ce.amount)
    }
  }
   console.log(korisniciPotrosnja)
  let labels= []
  let data =[]
  Object.entries(korisniciPotrosnja).forEach(([key, value]) => {
    console.log(key, value);
    labels.push(key)
    data.push(value)
 });
   console.log(labels)
    console.log(data)
 kreirajChart("Potrosnja korisnika",labels,data,2)
}

  function popuni(grid){
      grid.empty()
      grid.append('<div class="card" id="card-1">' +
          '<div class="chart-canvas">' +
          '<canvas id="myChart1"></canvas>' +
          '</div>' +
          '</div>')
      grid.append('<div class="card" id="card-1">' +
          '<div class="chart-canvas">' +
          '<canvas id="myChart2"></canvas>' +
          '</div>' +
          '</div>')
      grid.append('<div class="card" id="card-1">' +
          '<div class="chart-canvas">' +
          '<canvas id="myChart3"></canvas>' +
          '</div>' +
          '</div>')

    kreirajArtikalChart()
    kreirajPotrosnjaChart()
      kreirajWaiterHoursChart()
  }


  async function showTable(){
    startDate = $("#date-start").val()
    endDate = $("#date-end").val()
    if(!startDate ||  !endDate){
        console.log(startDate+" "+endDate)
    }else{
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        customerExp =await postData("apiGetCustomerExpeneture",{start:startDate.toISOString(),end:endDate.toISOString()})
        console.log(customerExp)
        prodatiArtikli = await postData("apiGetProductSold",{start:startDate.toISOString(),end:endDate.toISOString()})
        console.log(prodatiArtikli)
        waiterHours = await postData("apiGetWaiterWorkHours",{start:startDate.toISOString(),end:endDate.toISOString()})
        console.log(waiterHours)
        grid = $("#grid")
        popuni(grid)
    }
  }
var flag = false

  $(document).ready(
    ()=>{
      popuniSidebar("admin")
      for(let i =1;i < 5;i++){
        $("#card-"+i).hide()
      }
      $("#date-start").on('input',showTable)
      $("#date-end").on('input',showTable)
        $("#change-display").on('change',()=>{
            if(flag){
               $(".dashboard-cards").css( 'grid-template-columns', 'repeat(1, 1fr)')
            }else{
                $(".dashboard-cards").css( 'grid-template-columns', 'repeat(2, 1fr)')
            }
            flag=!flag
        })
    }
  )

  