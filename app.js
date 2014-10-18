var config = require('./config'),
	express = require('express'),
	app = express(),
	http = require('http').createServer(app),
	io = require('socket.io')(http),

	logger = require('morgan')('dev'),
	session = require('express-session'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    compression = require('compression'),
	httpres = require('./util/httpres');

app
    .set('views', './views')
    .set('view engine', 'jade')
	.set('view cache', true);

app
	.use(logger)
    .use(session({
        secret: config.secret,
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


	.use('/', require('./routes/index')(io))
	.use('/api', require('./routes/api')(io))

	.use(function(req, res) {
        res.render('error', {
            err: httpres[404]
        });
    });

module.exports = {
	app: app,
	server: http
};
