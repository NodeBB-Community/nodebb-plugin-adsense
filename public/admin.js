'use strict';

define('admin/plugins/google-adsense', ['settings'], function (Settings) {
	const admin = {};
	admin.init = function () {
		Settings.load('google-adsense', $('.google-adsense-settings'));

		$('#save').on('click', function () {
			Settings.save('google-adsense', $('.google-adsense-settings'));
			return false;
		});
	};

	return admin;
});
