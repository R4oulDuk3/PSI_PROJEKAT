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
  // const myChart = new Chart(
  //   document.getElementById('myChart'),
  //   config
  // );

  // const myChart2 = new Chart(
  //   document.getElementById('myChart2'),
  //   config2
  // );

  // const myChart3 = new Chart(
  //   document.getElementById('myChart3'),
  //   config3
  // );

  // const myChart4 = new Chart(
  //   document.getElementById('myChart4'),
  //   config4
  // );

  var prodatiArtikli = [
    {
      id:"1",
      kolicina:4,
      nazivArtikla:"Amstel",
    },
    {
      id:"1",
      kolicina:9,
      nazivArtikla:"Amstel",
    },
    {
      id:"1",
      kolicina:7,
      nazivArtikla:"Amstel",
    },
    {
      id:"2",
      kolicina:10,
      nazivArtikla:"Lasko",
    },
    {
      id:"2",
      kolicina:15,
      nazivArtikla:"Lasko",
    }
  ]

  var customerExp = [
    {
      customer :1,
      userName:"ZarlaDebilana",
      amount :2500
    },
    {customer :2,
      userName:"CoaBandera",
      amount :2500
    },
    {customer :3,
      userName:"KaleDzedaj",
      amount :2500
    },
    {customer :1,
      userName:"ZarlaDebilana",
      amount :2500
    }
  ]
  function kreirajChart(labelsC,dataC,num){
    // let card = $('<div class="card"></div>')
    // let chartDiv = $('<div class="chart-canvas"></div>')
    // let chart = $('<canvas id="myChart"></canvas>')
    $("#card-"+num).show()
    let chart = $('#myChart'+num)
    const config = {
      type: 'bar',
      data: {
        labels: labelsC,
        datasets: [{
          label: 'Kolicina potrosene robe u datom periodu',
          backgroundColor: '#B547C1',
          borderColor: '#B547C1',
          data: dataC,
        }]
      },
      options: {}
    };
    let myChart = new Chart(chart,config)
    // card.append(chartDiv)
    // chartDiv.append(chart[0])
    // return card

  }

  function popuni(grid){
    artikliPotrosnja ={

    }
    for(artikal of prodatiArtikli){
      if(artikal.nazivArtikla in artikliPotrosnja){
        artikliPotrosnja[artikal.nazivArtikla]+=artikal.kolicina
      }else{
        artikliPotrosnja[artikal.nazivArtikla]=artikal.kolicina
      }
    }
    let labels= []
    let data =[]
    Object.entries(artikliPotrosnja).forEach(([key, value]) => {
      console.log(key, value);
      labels.push(key)
      data.push(value)
   });
   kreirajChart(labels,data,1)
   korisniciPotrosnja = {}
   for(ce of customerExp){
    if(ce.userName in korisniciPotrosnja){
      korisniciPotrosnja[ce.userName]+=ce.amount
    }else{
      artikliPotrosnja[artikal.nazivArtikla]=ce.amount
    }
  }
  labels= []
  data =[]
  Object.entries(artikliPotrosnja).forEach(([key, value]) => {
    console.log(key, value);
    labels.push(key)
    data.push(value)
 });
 kreirajChart(labels,data,2)
  }

  function showTable(){
    startDate = $("#date-start").val()
    endDate = $("#date-end").val()
    if(!startDate ||  !endDate){
        console.log(startDate+" "+endDate)
    }else{
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        grid = $("#grid")
        popuni(grid)
    }
  }
  

  $(document).ready(
    ()=>{
      popuniSidebar("admin")
      for(let i =1;i < 5;i++){
        $("#card-"+i).hide()
      }
      $("#date-start").on('input',showTable)
      $("#date-end").on('input',showTable)
    }
  )

  