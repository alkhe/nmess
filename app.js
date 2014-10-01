var express = require('express'),
    app = express(),
    path = require('path'),

    logger = require('morgan')('dev'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    compression = require('compression'),

    mongoose = require('mongoose'),
    models = require('./utils/dbmodel'),
    httpstatus = require('./utils/httpstatus');

module.exports = function(port, secret) {

    var http = require('http').createServer(app),
        io = require('socket.io')(http);

    var index = require('./routes/index')(io),
        api = require('./routes/api')(io);

    app
        .set('port', port)
        .set('views', path.join(__dirname, 'views'))
        .set('view engine', 'jade');

    app
        .use(logger)
        .use(session({
            secret: secret,
            resave: true,
            saveUninitialized: true
        }))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: false
        }))
        .use(stylus.middleware('./public'))
        .use(compression())


        .use(express.static('./public'))


        .use('/', index)
        .use('/api', api)


        .use(function(req, res) {
            res.render('error', {
                err: httpstatus[404]
            });
        });

    return http;

};
