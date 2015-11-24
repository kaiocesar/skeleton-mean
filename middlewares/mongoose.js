/**
 * Created by Admin on 11/24/15.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/skeleton:27017');

module.exports = mongoose;