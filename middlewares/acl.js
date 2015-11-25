/**
 * Created by Admin on 11/25/15.
 */


module.exports = function(req, res, next){
    var mongodb = require('mongodb');
    var acl = require('acl');

    mongodb.connect('mongodb://localhost:12027/skeleton', function(error, db){
        var mongoBackend = new acl.mongodbBackend(db, 'acl_');
    });


};