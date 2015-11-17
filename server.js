var express = require("express");
var mongoose = require("mongoose");
var app = express();
var cors = require("cors");
var bodyParser=require("body-parser");
var http = require("https");
var PythonShell = require('python-shell');
//var pyshell = new PythonShell('teste.py', { args: ['hello', 'world','tete']});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var City = require('./db/db_cities_model');

app.get("/",function(res){
    res.sendfile(".../index.html");
});

/*
OMG = "countryID"+aux["location_suggestions"][0]["country_id"];
console.log("teste "+aux["location_suggestions"][0]["country_id"]);
var OMG;
PythonShell.run('teste.py',{ args: ['hello', 'world','tete']}, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
    var res = results[0].replace(/u'|'/g, "\"");
    var aux = JSON.parse(res);
    OMG = "countryID"+aux["location_suggestions"][0]["country_id"];
    console.log("teste "+aux["location_suggestions"][0]["country_id"]);
}); */


app.post("/cityquery", function(req, res) {
    console.log("body is: " + req.body.city);
    var cityQuery = new City({city: req.body.city});
    cityQuery.save(function(err){
        if(err){
            console.log("Error");
        }
        else{
            console.log("Saved city in the DB");
            PythonShell.run('teste.py',{ args: [req.body.city]}, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                console.log('results: %j', results);
                var response = results[0].replace(/u'|'/g, "\"");
                var arr = JSON.parse(response);
                res.send([arr["location_suggestions"][0]["name"], arr["location_suggestions"][0]["id"]]);
            });
           // res.send(req.body.city);
        }});
});

app.post("/restlist",function(req,resp){

    console.log("Teste "+req.body.data[1]);
    PythonShell.run('listRestaurants.py',{ args: [req.body.data[1],req.body.data[0], 10]}, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results of list: %j', results);
       // var response = results[0].replace(/\\"/g, "\"");
        var response = results[0].replace(/, \\"/g, ", \"");
        var response2 = response.replace(/\\":/g, "\":");
        resp.send(JSON.parse(response2));
    });
});
    /*
    var cityQuery = new City({city: req.body.city});
    cityQuery.save(function(err){
        if(err){
            console.log("Error");
        }
        else{
            console.log("Saved city in the DB");
            PythonShell.run('teste.py',{ args: [req.body.city]}, function (err, results) {
                if (err) throw err;
                // results is an array consisting of messages collected during execution
                console.log('results: %j', results);
                var response = results[0].replace(/u'|'/g, "\"");
                res.send(JSON.parse(response));
            });
            // res.send(req.body.city);
        }});
        */

var server=app.listen(3000, function(){
    console.log('Web server listening on port 3000');
});

server.timeout=1500;