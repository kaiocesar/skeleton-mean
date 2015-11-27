/**
 * Created by Admin on 11/25/15.
 */

var userModel = require('../models/user');


module.exports.checkPermissions = function(role){
    return function(req, res, next){
        userModel.findOne({'_id': req.user._id, 'acl.role': role}, function(err, user){
           if (err){
               res.redirect('/login');
           } else {
               if (Object.prototype.toString.call(user) == '[object Object]'){
                   if (user._id.toString() == req.user._id.toString()){
                       next();
                   } else {
                       res.json('Invalid request');
                   }
               } else {
                   res.json('Invalid request');
               }
           }
        });
    }
};