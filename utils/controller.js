var db = require('../utils/model');

module.exports = {
	get: function(condition, callback) {
		db.Entity.find(condition, callback);
	},
	create: function(document, callback) {
		new db.Entity(document).save(callback);
	},
	update: function(condition, document, options, callback) {
		db.Entity.update(condition, document, options, callback);
	},
	remove: function(condition, callback) {
		db.Entity.find(condition).remove(callback);
	}
}
