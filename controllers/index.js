/**
 * Created by Admin on 11/22/15.
 */


module.exports = function(passport){
    var express = require('express')
        , router = express.Router()
        , Comment = require('../models/comment')
        , auth = require('../middlewares/auth')
        , passport = require('../middlewares/passport')(passport)
        , acl = require('../middlewares/acl');

        //, node_acl = require('acl')
        //, acl
        //, mongodb = require('mongodb');

    //
    //mongodb.connect( 'mongodb://127.0.0.1:27017/skeleton', function (err, db){
    //    var mongoBackend = new node_acl.mongodbBackend( db /*, {String} prefix */ );
    //    acl = new node_acl( mongoBackend);
    //});


    router.use('/comments', require('./comments'));
    router.use('/users',auth, require('./users'));

    router.get('/', function(req, res){
        Comment.all(function(err, comments){
            res.setLocale('pt-br');
            res.render('index', {comments: comments});
        });
    });

    router.get('/about', function(req, res){
        res.render('about');
    });

    router.get('/login', function(req, res){
        res.render('login', {message: req.flash('loginMessage')});
    });


    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));


    router.post('/signup', passport.authenticate('local-signup',{
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    router.get('/profile',[auth, acl.checkPermissions('admin')], function(req, res){
       res.send('Welcome to Profile user');
    });

    router.get('/guest-secret', [auth, acl.checkPermissions('guest')], function(req, res){
        res.send('Guest area');
    });


    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
    });



    return router;

};

