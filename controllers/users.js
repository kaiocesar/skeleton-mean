/**
 * Created by Admin on 11/22/15.
 */

var express = require('express')
    , router = express.Router();

router.get('/', function(req, res){
    res.send('List all users');
});

router.get('/create', function(req, res){
    res.send('Create a new user');
});

router.get('/show/:id', function(req, res){
    var id = req.params.id;
    res.send('Show user id ' + id);
});

module.exports = router;