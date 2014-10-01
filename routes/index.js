var express = require('express'),
	router = express.Router(),
	control = require('../utils/controller');

module.exports = function(io) {

	router.get('/', function(req, res) {
		res.render('index', {

		});
	});

	io.on('connection', function(socket) {
		socket.on('init', function(data) {
			socket
				.emit('response', {
					
				})
				.on('disconnect', function() {

				});
		});
	});

	return router;

};
