///<reference path='../typings/main/ambient/node/node.d.ts'/>
///<reference path='../typings/main/ambient/express/express.d.ts'/>
var passport = require('passport');
var util = require('util');
// var register = require('../controllers/register');
// var userService = require('../services/UserService');
// var UserService = new userService.UserService();
var pg = require('pg');
//var connectionString = 'postgres://tktgpsbkoyvbep:CJjoY9wIRXLBgFG3WSsTGJsOrX@ec2-54-225-223-40.compute-1.amazonaws.com:5432/ddsg8nfog95prg?ssl=true';
var connectionString = 'postgres://postgres:postgres@localhost:5432/team3';
module.exports = function (express) {
    var router = express.Router();
    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'Please login before proceeding.');
        res.redirect('/');
    };
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', { title: 'Express' });
    });

    // with authentication
    // router.post('/login', passport.authenticate('local', {
    //     successRedirect: '/feed',
    //     failureRedirect: '/',
    //     failureFlash: true
    // }));

    router.post('/login', function (req, res, next) {
        res.render('verify', { title: 'Express' });
    });
    router.get('/verify', function (req, res, next) {
        res.render('verify', { title: 'Express' });
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    router.get('/explore', isAuthenticated, function (req, res) {
        res.render('explore');
    });
    //Routing
    
    router.post('/api/v1/verify', function (req, res) {
        // authenticate
        var results = {};        

        console.log("test");
        console.log(util.inspect(req.body, false, null));

        // Make call to external API using data from req.body

        // external api returns true for verified
        results.verified = true

        // or false for not verified
        // results.verified = false

        // handle error if external API fails or times out

        return res.json(results);
    });

   
    return router;
};