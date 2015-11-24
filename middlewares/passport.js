/**
 * Created by Admin on 11/23/15.
 */



var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');


module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });


    //signup
    passport.use('local-signup', new LocalStrategy({
       usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:  true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.find({'email': email}, function(err, user){
               if (err){
                   return done(err);
               }

               if (user){
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
               } else {
                   var newUser = new User();
                   newUser.email = email;
                   newUser.password = newUser.generateHash(password);

                   newUser.save(function(err){
                       if (err){
                           throw err;
                       }
                       return done(null, newUser);
                   });
               }
            });
        });
    }
    ));




    // local login
    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function (req, email, password, done) {

            User.findOne({'email' : email }, function(err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops Wrong password.'))

                if (user.status === false)
                    return done(null, false, req.flash('loginMessage','Check your email registration confirmation.'));

                return done(null, user);

            });
        }
    ));


    return passport;


};