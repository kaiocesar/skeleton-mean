/**
 * Created by Admin on 11/22/15.
 */
var express = require('express')
    , app = express()
    , path = require('path')
    , port = process.env.PORT || 3000
    , bodyparser = require('body-parser')
    , swig = require('swig')
    , i18n = require('i18n');

var passport = require('passport')
    , morgan = require('morgan')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , flash = require('connect-flash');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
swig.setDefaults({cache: false});

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(cookieParser()) ;

i18n.configure({
    locales: ['de', 'en', 'pt-br', 'es', 'fr'],
    defaultLocale: 'pt-br',
    directory: path.join(__dirname, 'views/locales'),
    cookie: 'langsys'
});
app.use(i18n.init);

app.use(session({secret: 'minhachavesecreta',saveUninitialized : true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use(require('./middlewares/users'));
app.use(require('./controllers')(passport));


app.listen(port, function(){
    console.log('Listening on port %s', port);
});



