
// get request to get scores data // 
"use strict";

var getScores = function(url, method) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            showChart(xhr.responseText);
        }
        };
    xhr.open(method, url);
    xhr.send();
    
};

function showChart(data) {
   var right = 0;
   var wrong = 0;
   var chartData = JSON.parse(data);
   chartData.forEach(function(val) {
       if (val === 1) {
           right += 1;
       } else {
           wrong += 1;
       }
   });
   console.log(wrong + "" + right);

var ctx = document.getElementById("mychart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
  labels: [
        "Wrong",
        "Right"
    ],
    datasets: [
        {
            data: [wrong, right],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
  }
});
    
}

getScores(window.location.href + "/scores", "GET");