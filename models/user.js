/**
 * Created by Admin on 11/22/15.
 */

var mongoose = require('../middlewares/mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for ou user model
var userSchema = mongoose.Schema({
        email : String,
        password : String,
        name : String,
        login : String,
        name_profile : String,
        status : Boolean
});

// Methods MongoDB ======================================

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);