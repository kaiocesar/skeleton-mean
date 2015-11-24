/**
 * Created by Admin on 11/22/15.
 */


module.exports = function(passport){
    var express = require('express')
        , router = express.Router()
        , Comment = require('../models/comment')
        , auth = require('../middlewares/auth')
        , passport = require('../middlewares/passport')(passport);

    router.use('/comments', require('./comments'));
    router.use('/users', require('./users'));

    router.get('/', function(req, res){
        Comment.all(function(err, comments){
            res.render('index', {comments: comments});
        });
    });

    router.get('/login', function(req, res){
        res.render('login');
    });


    router.post('/signup', passport.authenticate('local-signup',{
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));


    return router;

};

