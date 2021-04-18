const express = require('express')
const app = express()
const port = 5600;

let avails = [0, 0, 0];
let time = [0, 0, 0];
const {performance} = require('perf_hooks');
let date = new Date();

let weekCount = 0;

let masterData = [];

let data = [];

for(i = 0; i < 7;  i++){
  data[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

let avgData = [...data];

for(i = 0; i < 4; i++){
  masterData[i] = [...data];
}

app.get('/profile/:id', function(req, res){
  res.send('You requested to see profile with ID of ' + req.params.id);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', function(req, res) {
    var roomNumber = req.param('r');
    var availability = req.param('f');

    avails[roomNumber] = parseInt(availability);

    res.send(avails);

    if(parseInt(availability) == 0){
      time[roomNumber] = performance.now();
    }
    else if(parseInt(availability) == 1){
      let day = date.getDay();
      let hour = date.getHours();
      if(day == 0){
        weekCount ++;
      }
      masterData[weekCount][day][hour] = 1;
    }
    
      for(j  = 0; j < 7; j++){
        for(y = 0; y < 24; y++){
          avgData[j][y] = masterData[masterData.length-1][j][y] + masterData[masterData.length-2][j][y] + masterData[masterData.length-3][j][y] + masterData[masterData.length-4][j][y]; 
        }
      }

      //console.log(avgData);
     
});


setInterval(print, 1000)

function print(){
  let temp = [0, 0, 0];
  for(i = 0; i < 3; i++){
    temp[i] = performance.now() - time[i];
  }
  console.log(temp);
}