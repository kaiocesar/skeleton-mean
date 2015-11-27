/**
 * Created by Admin on 11/27/15.
 */
var assert = require('assert');

var userModel = require('../../models/user');


describe('User mode test:', function(){

    it('Check role user', function(){
        var permission = "admin";
        userModel.findOne({email: "kaio"}, function(err, user){
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    });

});