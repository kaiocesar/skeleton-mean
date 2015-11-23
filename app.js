/**
 * Created by Admin on 11/22/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;
var bodyparser = require('body-parser');
var swig = require('swig');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(require('./middlewares/users'));
app.use(require('./controllers'));


app.listen(port, function(){
    console.log('Listening on port %s', port);
});



