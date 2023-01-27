'use strict';

(function () {
	let state = 'none';

	function loadAdsScript() {
		state = 'loading';
		$.getScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-' + config.googleAdsense.client_id)
			.done(function () { state = 'loaded'; })
			.fail(function () { state = 'none'; });
	}

	function onWidgetsLoaded() {
		const hasAdsenseInWidgets = Object.keys(ajaxify.data.widgets).some(function (location) {
			const widgetsAtLocation = ajaxify.data.widgets[location] || [];
			return widgetsAtLocation.some(w => w.html.includes('data-nodebb-adsense'));
		});
		if (hasAdsenseInWidgets && state === 'none') {
			loadAdsScript();
		}
	}

	$(window).on('action:widgets.loaded', onWidgetsLoaded);
}());

