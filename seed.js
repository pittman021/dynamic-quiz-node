var mongoose = require("mongoose");
var User = require("./models/user");

function seedDB() {
    // Remove all users
    User.remove({},function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('users removed');
        }
    });
    
    User.create({
        
    })
}

module.exports = seedDB;

