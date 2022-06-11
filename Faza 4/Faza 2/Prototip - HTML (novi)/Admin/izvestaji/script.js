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
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
  );

  const myChart3 = new Chart(
    document.getElementById('myChart3'),
    config3
  );

  const myChart4 = new Chart(
    document.getElementById('myChart4'),
    config4
  );