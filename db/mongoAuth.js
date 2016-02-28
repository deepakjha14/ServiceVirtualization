/**
 * Created by Deepak_Jha09 on 2/20/2016.
 * This file will house configuration related stuff of mongo database.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/testSerVir");

var userSchema = new Schema({
    username : String,
    password : String,
    project : String
});

var User = mongoose.model('User', userSchema, 'User');

User.find({username:"admin"}, function(err, user){
    console.log(user+" This is the User Object !!!");
});

module.exports = User;