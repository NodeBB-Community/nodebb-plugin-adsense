'use strict';

var state = 'none';

function loadAdsScript() {
	state = 'loading';
	$.getScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-' + config.googleAdsense.client_id)
		.done(function () { state = 'loaded'; })
		.fail(function () { state = 'none'; });
}

function onWidgetsLoaded() {
	var hasAdsenseInWidgets = Object.keys(ajaxify.data.widgets).some(function (location) {
		var widgetsAtLocation = ajaxify.data.widgets[location] || [];
		return widgetsAtLocation.some(function (widget) {
			return widget.html.includes('data-nodebb-adsense');
		});
	});
	if (hasAdsenseInWidgets && state === 'none') {
		loadAdsScript();
	}
}

$(window).on('action:widgets.loaded', onWidgetsLoaded);
