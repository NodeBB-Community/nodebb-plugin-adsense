'use strict';

var async = require('async');
var validator = require('validator');

var meta = require.main.require('./src/meta');
var groups = require.main.require('./src/groups');

var Adsense = module.exports;

Adsense.onConfigGet = function (config, callback) {
	async.waterfall([
		function (next) {
			meta.settings.get('google-adsense', next);
		},
		function (options, next) {
			config.googleAdsense = options;
			var adFreeGroups = [];
			try {
				adFreeGroups = JSON.parse(options.adFreeGroups || '[]');
			} catch (err) {
				return next(err);
			}
			groups.isMemberOfGroups(config.uid, adFreeGroups, next);
		},
		function (isMemberOfAdFreeGroups, next) {
			config.googleAdsense.isInAdFreeGroup = isMemberOfAdFreeGroups.includes(true);
			next(null, config);
		},
	], callback);
};

Adsense.admin = {};
Adsense.admin.menu = function (custom_header, callback) {
	custom_header.plugins.push({
		route: '/plugins/google-adsense',
		icon: 'fa-usd',
		name: 'Google Adsense',
	});
	callback(null, custom_header);
};

Adsense.admin.onLoad = function (params, callback) {
	function render(req, res) {
		async.waterfall([
			function (next) {
				groups.getGroups('groups:createtime', 0, -1, next);
			},
			function (groupNames) {
				groupNames = groupNames.filter(function (groupName) {
					return groupName && !groups.isPrivilegeGroup(groupName);
				});

				var list = groupNames.map(function (groupName) {
					return {
						name: validator.escape(String(groupName)),
						value: validator.escape(String(groupName)),
					};
				});
				res.render('admin/plugins/google-adsense', {
					groups: list,
				});
			},
		], callback);
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
			{ field: 'after_first_post_id', value: '' },
			{ field: 'first_post_position', value: 'bottom' },
			{ field: 'first_post_id', value: '' },
		];

		async.each(defaults, function (optObj, next) {
			meta.settings.setOnEmpty('google-adsense', optObj.field, optObj.value, next);
		});
	}
};
