/**
 * Created by Admin on 11/27/15.
 */

var assert = require('assert');
var mocks = require('node-mocks-http');


var req = mocks.createRequest();
var res = mocks.createResponse();


function controllers(req, res){
    if (res.user == undefined){
        //res.json('Invalid request');
        return 'Invalid request';
    }

};


describe('ACL Test middleware', function(){

    it('Is allowed access', function(){

        assert.equal(controllers(req, res), 'Invalid request');

    });

});