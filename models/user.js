/**
 * Created by Admin on 11/22/15.
 */
var mongoose = require('mongoose')
    , bcrypt = require('bcrypt-nodejs');



var userSchema = mongoose.Schema({
   local    : {
       email: String,
       password: String,
       name_real: String,
       name_perfil: String,
       login: String,
       language: String,
       phone: String,
       created_at: Date,
       status: Boolean
   }
});


userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);