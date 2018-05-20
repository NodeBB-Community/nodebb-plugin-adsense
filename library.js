'use strict';

var async = require('async');
var meta = module.parent.require('./meta');
var helpers = module.parent.require('./routes')

var Adsense = module.exports;

Adsense.onConfigGet = function (config, callback) {
	meta.settings.get('google-adsense', function(err, options) {
		if (err) {
			return callback(err);
		}
		config.googleAdsense = options;
		callback(null, config);
	});
};

Adsense.admin = {};
Adsense.admin.menu = function (custom_header, callback) {
	custom_header.plugins.push({
		"route": '/plugins/google-adsense',
		"icon": 'fa-usd',
		"name": 'Google Adsense'
	});
	callback(null, custom_header);
};

Adsense.admin.onLoad = function (params, callback) {
	function render(req, res) {
		res.render('admin/plugins/google-adsense', {});
	}

	params.router.get('/admin/plugins/google-adsense', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/google-adsense', render);

	callback();
};

Adsense.admin.activate = function (data) {
	if (data.id === 'nodebb-plugin-google-adsense') {
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