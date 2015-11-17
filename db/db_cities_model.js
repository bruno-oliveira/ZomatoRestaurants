var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/zomatoDB");
//var City = mongoose.model('City',{city:String,unique : true, dropDups: true }); //check if its the best alternative to pass in an HTTP post request

var CitySchema= new Schema({
    city     : { type : String } });

var City = mongoose.model('City',CitySchema);

// make this available to our users in our Node applications
module.exports = City;
