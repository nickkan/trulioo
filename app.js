///<reference path='./typings/main/ambient/node/node.d.ts'/>
///<reference path='./typings/main/ambient/express/express.d.ts'/>
var Application = (function () {
    function Application() {
    }
    Application.prototype.init = function () {
        var pg = require('pg');
        var express = require('express');
        var app = express();
        var passportConfig = require('./config/passport');
        var flash = require('connect-flash');
        var routes = require('./routes/index')(express);
        var session = require('express-session');
        var bodyParser = require('body-parser');
        var cookieParser = require('cookie-parser');
        var jsonParser = bodyParser.json();
        var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/team3';
        app.engine('html', require('ejs').renderFile);
        app.set('port', (process.env.PORT || 3333));
        app.use(cookieParser());
        app.use(session({ secret: 'three3three', resave: false, saveUninitialized: false }));
        app.use('/static', express.static(__dirname + '/public'));
        app.use('/controllers', express.static(__dirname + '/controllers'));
        app.use('/node_modules', express.static(__dirname + '/node_modules'));
        app.use(flash());
        app.use(function (req, res, next) {
            res.locals.errorMessage = req.flash('error');
            next();
        });
        app.use(jsonParser);
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        passportConfig(app);
        // view engine setup
        app.set('views', __dirname + '/views');
        app.set('view engine', 'html');
        app.use('/', routes);
        app.listen(app.get('port'), function () {
            console.log('Node app is running on port', app.get('port'));
        });
        module.exports = app;
    };
    return Application;
})();
var application = new Application();
application.init();
//# sourceMappingURL=app.js.map