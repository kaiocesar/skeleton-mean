/**
 * Created by Admin on 11/22/15.
 */
var express = require('express')
    , router = express.Router()
    , Comment = require('../models/comment');

router.use('/comments', require('./comments'));
router.use('/users', require('./users'));


router.get('/', function(req, res){
    Comment.all(function(err, comments){
        res.render('index', {comments: comments});
    })
});
