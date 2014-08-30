module.exports = function(port) {

    var express = require('express'),
        app = express(),
        http = require('http').createServer(app),
        io = require('socket.io')(http),
        path = require('path'),
        stylus = require('stylus'),
        compression = require('compression'),
        session = require('express-session'),
        logger = require('morgan')('dev'),
        mongoose = require('mongoose'),
        models = require('./utils/dbmodel'),
        httpstatus = require('./utils/httpstatus');

    var index = require('./routes/index')(io);

    app.set('port', port)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'jade');

    app.use(logger)
    .use(session({
        secret: "<|MESS_SECRET|>",
        resave: true,
        saveUninitialized: true
    }))
    .use(stylus.middleware('./public'))
    .use(express.static('./public'))
    .use(compression());

    app.use('/', index);

    app.use(function(req, res) {
        res.render('error', {
            err: httpstatus[404]
        });
    });

    return http;
}
