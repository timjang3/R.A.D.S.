
var path = require('path');
var express = require('express');
const app = express();

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


/*
app.post("/", (req, res) => {
    const room = req.param('r');
    const newStatus = req.param('f');
    avails[room] = newStatus;
    console.log("new avails:", avails);
    res.json({ message: "Success!", avails });
});

app.post("/rooms/:room/status", (req, res) => {
    if (typeof req.body["value"] !== "number")
        return res.status(400).json({ message: "No valid new value is specified" });
    const room = +req.params["room"];
    const newStatus = req.body["value"];
    avails[room] = newStatus;
    console.log("new avails:", avails);
    res.json({ message: "Success!", avails });
});
*/

app.listen(3000, () => console.log("Server is ready"));
/*
http.createServer(function (req, res) {
    let route = req.url.replace('/', '')

    let request_url = route === '' || route === '/' ? 'website.html' : route

    var room = url.parse(req.url, true).query['r'];
    var status = url.parse(req.url, true).query['f'];

    avails[room] = parseInt(status);
    console.log(avails);

    console.log(request_url)

    fs.exists(request_url, (exist) => {
        if (Boolean(exist) === false) {
            res.writeHead(404, {'content-type': 'text/html'})
            res.end('Page Not Found')
            return null
        }

        fs.readFile(request_url, function (err, data) {
            res.writeHead(200)
            res.write(data)
            res.end()
        })
    })
}).listen(8080);
*/
