var mongoose = require('mongoose');

module.exports = function(database, callback) {
	mongoose.connect('mongodb://' + database).connection.once('open', callback).on('error', callback);
};
