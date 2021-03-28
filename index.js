const express = require('express')
const app = express()
const port = 3001

let avails = [0, 0, 0];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/rm', function(req, res) {
    var roomNumber = req.param('r');
    var availability = req.param('f');

    avails[roomNumber] = availability;

    console.log(avails);
    res.send(avails);
});