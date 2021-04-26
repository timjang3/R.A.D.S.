
var path = require('path');
var express = require('express');
const app = express();
const port = process.env.PORT || '3000';
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
var nodemailer = require('nodemailer');

var email = "";

let avails = ['0', '0', '0', '0'];
let emailList = [];

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path);
    next();
});

app.get("/", function(req,res) {
  res.sendFile("website.html", {root: path.join(__dirname, "public")})
})

app.get('/website.css', function(req, res) {
  res.sendFile(__dirname + "/public/" + "website.css");
});

app.get('/website.js', function(req, res) {
  res.sendFile(__dirname + "/public/" + "website.js");
});

app.post("/reserve",  function(req, res){
  email = req.body.email;
  emailList.push(email);
  console.log(emailList);
  res.writeHead(302, {
    'Location': 'http://www.roomavailable.info/'
  });
  res.end();
})

app.get("/avails", (req, res) => res.json(avails));

app.get('/test', function(req, res){
    var room = req.query.r;
    var status = req.query.f;
    avails[room] = status;
    if(avails.includes("0") && emailList.length > 0){
      for(let i = 0; i < avails.length; i++){
        if(avails[i] === "0"){
          var mailOptions = {
            from: 'roomavailableinfo@gmail.com',
            to: emailList[0],
            subject: 'Piano room available!',
            text: 'Piano room is available now! Thank you for using our service!'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          emailList.shift();
          break;
        }
      }
    }
    console.log(avails);
    console.log(emailList);
    res.end("done");
  });

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'roomavailableinfo@gmail.com',
    pass: 'bluesnowball'
  }
});

app.listen(port, () => console.log("Server is ready"));