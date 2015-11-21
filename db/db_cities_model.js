var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/zomatoDB");
var City = mongoose.model('City',{city:String}); //check if its the best alternative to pass in an HTTP post request


// make this available to our users in our Node applications
module.exports = City;
