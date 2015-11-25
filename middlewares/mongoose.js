/**
 * Created by Admin on 11/24/15.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/skeleton');

module.exports = mongoose;