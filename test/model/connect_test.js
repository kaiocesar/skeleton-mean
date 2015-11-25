var assert = require('assert');
var Sequelize = require('sequelize');
var dsn = 'mysql://root:@127.0.0.1:3306/skeleton_db';
var MongoClient = require('mongodb').MongoClient;

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
        var dsn_mongo = 'mongodb://127.0.0.1:12027/skeleton';
        MongoClient.connect(dsn_mongo, function(err, db){
            assert.equal(null, err);
            db.close();
        });
    });

});