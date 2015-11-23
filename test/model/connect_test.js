var assert = require('assert');
var Sequelize = require('sequelize');
//var sequelize = new Sequelize('skeleton_db',  'root', '', {host:'127.0.0.1', dialect: 'mysql'});
var dsn = 'mysql://root:@127.0.0.1:3306/skeleton_db';


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
});