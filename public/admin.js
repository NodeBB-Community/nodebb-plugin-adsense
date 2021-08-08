'use strict';

define('admin/plugins/google-adsense', ['settings'], function (Settings) {
	Settings.load('google-adsense', $('.google-adsense-settings'));

	$('#save').on('click', function () {
		Settings.save('google-adsense', $('.google-adsense-settings'), function () {
			app.alert({
				type: 'success',
				alert_id: 'google-adsense-saved',
				title: '',
				message: 'Settings Saved',
			});
		});
		return false;
	});
});
