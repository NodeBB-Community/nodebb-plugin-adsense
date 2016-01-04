'use strict';

var async = require('async');
var meta = module.parent.require('./meta');
var winston = module.parent.require('winston');

var settings = {};

var Adsense = {};

Adsense.loadSettings = function() {
	meta.settings.get('google-adsense', function(err, options) {
		if (err) {
			return winston.error(err);
		}
		settings = options;
	});
};

var admin = {};

admin.menu = function(custom_header, callback) {
	custom_header.plugins.push({
		"route": '/plugins/google-adsense',
		"icon": 'fa-usd',
		"name": 'Google Adsense'
	});

	callback(null, custom_header);
};

admin.onLoad = function(params, callback) {
	function render(req, res) {
		res.render('admin/plugins/google-adsense', {});
	}

	params.router.get('/admin/plugins/google-adsense', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/google-adsense', render);
	params.router.get('/google-adsense.config', function(req, res) {
		res.json(settings);
	});

	Adsense.loadSettings();

	callback();
};

admin.activate = function(id) {
	if (id === 'nodebb-plugin-adsense') {
		var defaults = [
			{ field: 'client_id', value: '' },
			{ field: 'header_id', value: '' },
			{ field: 'footer_id', value: '' },
			{ field: 'after_first_post_id', value: ''},
			{ field: 'first_post_position', value: 'bottom' },
			{ field: 'first_post_id', value: '' }
		];

		async.each(defaults, function(optObj, next) {
			meta.settings.setOnEmpty('google-adsense', optObj.field, optObj.value, next);
		});
	}
};

admin.reloadSettings = function(data) {
	if (data.plugin === 'google-adsense') {
		settings = data.settings;
	}
};

Adsense.admin = admin;


module.exports = Adsense;
