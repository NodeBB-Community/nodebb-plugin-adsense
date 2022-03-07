'use strict';

define('admin/plugins/google-adsense', ['settings', 'alerts'], function (Settings, alerts) {
	const admin = {};
	admin.init = function () {
		Settings.load('google-adsense', $('.google-adsense-settings'));

		$('#save').on('click', function () {
			Settings.save('google-adsense', $('.google-adsense-settings'), function () {
				alerts.success('Settings Saved');
			});
			return false;
		});
	};

	return admin;
});
