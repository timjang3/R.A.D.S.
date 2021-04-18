
var path = require('path');
var express = require('express');
const app = express();
const port = process.env.PORT || '3000';

let avails = [0, 0, 0];

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/avails", (req, res) => res.json(avails));

app.get('/test', function(req, res){
    var room = req.query.r;
    var status = req.query.f;
    avails[room] = status;
  });

app.listen(port, () => console.log("Server is ready"));