var config = require('./config'),
	express = require('express'),
	app = express(),
	http = require('http').createServer(app),
	io = require('socket.io')(http),

	logger = require('morgan')('dev'),
	session = require('express-session'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
	templatizer = require('templatizer'),
    compression = require('compression'),
	httpres = require('./util/httpres');

app
    .set('views', './views')
    .set('view engine', 'jade')
	.set('view cache', true);


app
	.use([
		logger,
		session({
		    secret: config.secret,
		    resave: true,
		    saveUninitialized: true
		}),
		bodyParser.json(),
		bodyParser.urlencoded({
			extended: false
		}),
		function(req, res, next) {
			process.nextTick(next);
			templatizer('./public/tpl', './public/js/templates.js');
		},
		stylus.middleware('./public'),
		compression(),
		express.static('./public')
	])

	.use('/', require('./router.js')(io))

	.use(function(req, res) {
        res.render('error', {
            err: httpres[404]
        });
    });

module.exports = {
	app: app,
	server: http
};
