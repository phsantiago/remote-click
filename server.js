var robot = require("robotjs");
var express = require("express");
const path = require('path');
var app = express();
var fs = require('fs')

function getAddr(){
    return new Promise(function(resolve, reject){
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            if(err){
                reject(err);
            }
            resolve(add);
        })
    })
}
app.get('/click', function (req, res) {
    robot.mouseClick();
    res.sendStatus(200);
});

app.get('/', function (req, res) {
    fs.readFile('./client/build/index.html', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        getAddr().then((ip) => {
            var result = data.replace(/__REMOTE_ADDR__/g, ip+'');
            res.send(result)
        })
    });
});
app.use(express.static(path.join(__dirname, 'client/build')));


app.listen(80, function () {
    getAddr().then((ip) => {
        console.log(`Running! ${ip}:80`);
    })
});