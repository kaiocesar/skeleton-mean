var assert = require('assert');
var Sequelize = require('sequelize');
var dsn = 'mysql://root:@127.0.0.1:3306/skeleton_db';
var MongoDb = require('mongodb');
var MongoClient = MongoDb.MongoClient;
var node_acl = require('acl'), acl;

var passport = require( 'passport' )
    , localStrategy = require( 'passport-local' ).Strategy;

var insertDocuments = function(db, callback){
    var collection = db.collection('users');

    collection.insertMany([
        {email : 'kaio@email.com'}, {password: 123}, {status:true}
    ], function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);

        callback(result);

    });
};

function authorization_setup(error, db){
    var mongoBackend = new node_acl.mongodbBackend(db);

    acl = new node_acl( mongoBackend);

    set_roles();
    set_routes();
}

function set_roles() {

    // Define roles, resources and permissions
    acl.allow([
        {
            roles: 'admin',
            allows: [
                { resources: '/secret', permissions: '*' }
            ]
        }, {
            roles: 'user',
            allows: [
                { resources: '/secret', permissions: 'get' }
            ]
        }, {
            roles: 'guest',
            allows: []
        }
    ]);

    // Inherit roles
    //  Every user is allowed to do what guests do
    //  Every admin is allowed to do what users do
    acl.addRoleParents( 'user', 'guest' );
    acl.addRoleParents( 'admin', 'user' );
}


function set_routes() {

    // Check your current user and roles
    app.get( '/status', function( request, response ) {
        acl.userRoles( get_user_id( request, response ), function( error, roles ){
            response.send( 'User: ' + JSON.stringify( request.user ) + ' Roles: ' + JSON.stringify( roles ) );
        });
    });

    // Only for users and higher
    app.get( '/secret',
        // Actual auth middleware
        [ authenticated, acl.middleware( 1, get_user_id ) ],
        function( request, response ) {
            response.send( 'Welcome Sir!' );
        }
    );

    // Logging out the current user
    app.get( '/logout', function( request, response ) {
        request.logout();
        response.send( 'Logged out!' );
    });

    // Logging in a user
    //  http://localhost:3500/login?username=bob&password=secret
    app.get( '/login',
        passport.authenticate( 'local', {} ),
        function( request, response ) {
            response.send( 'Logged in!' );
        }
    );

    // Setting a new role
    app.get( '/allow/:user/:role', function( request, response, next ) {
        acl.addUserRoles( request.params.user, request.params.role );
        response.send( request.params.user + ' is a ' + request.params.role );
    });

    // Unsetting a role
    app.get( '/disallow/:user/:role', function( request, response, next ) {
        acl.removeUserRoles( request.params.user, request.params.role );
        response.send( request.params.user + ' is not a ' + request.params.role + ' anymore.' );
    });
}


function authentication_setup() {

    // Setup session support
    passport.serializeUser( function( user, done ) {
        done( null, user.id );
    });

    passport.deserializeUser( function( id, done ) {
        find_user_by_id( id, function ( error, user ) {
            done( error, user );
        });
    });

    // Setup strategy (local in this case)
    passport.use( new localStrategy(
        function( username, password, done ) {
            process.nextTick( function () {
                find_by_username( username, function( error, user ) {

                    if ( error ) {
                        return done( error );
                    }

                    if ( ! user ) {
                        return done( null, false, { message: 'Unknown user ' + username } );
                    }

                    if ( user.password != password ) {
                        return done( null, false, { message: 'Invalid password' } );
                    }

                    // Authenticated
                    return done( null, user );
                });
            });
        }
    ));
}



describe('MySQL test:', function(){
    it('Connectivity', function(){
        try{
            var sequelize = new Sequelize(dsn);
        } catch(e) {
            var sequelize = false;
        }
        assert.equal(typeof sequelize, 'object');
    });

    it('Create table', function(){

        var sequelize = new Sequelize(dsn);

        try{

            var User = sequelize.define('user', {
                name: {
                    type: Sequelize.STRING,
                    field: 'name'
                },
                email: {
                    type: Sequelize.STRING,
                    field: 'email'
                }
            }, {
                freezeTableName: false,
                paranoid: true
            });


            var userCreate = User.sync({force: true}).then(function(){
                return User.create({
                    name: 'Pamela',
                    email: 'pamela@email.com'
                });
            });

        } catch(e){
            return e;
        }

        assert.equal(typeof userCreate, 'object');

    });

    it('Connectiong to MongoDB', function(){
        var dsn_mongo = 'mongodb://127.0.0.1:27017/skeleton';
        MongoClient.connect(dsn_mongo, function(err, db){
            assert.equal(null, err);
            db.close();
        });
    });

    it('Insert some documents on MongoDB', function(){
        var url = 'mongodb://127.0.0.1:27017/skeleton';
        MongoClient.connect(url, function(err, db){
           assert.equal(null, err);

            insertDocuments(db, function(){
               db.close();
            });
        });
    });

    it('Test ACL', function(){

        var acl = require('acl');
        var db = MongoDb.connect('mongodb://127.0.0.1:27017/skeleton', authorization_setup);





        assert.equal(typeof acl, 'object');

    });



});