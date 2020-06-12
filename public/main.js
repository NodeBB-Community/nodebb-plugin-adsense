/* globals window, config, ajaxify, $ */

'use strict';

var loaded = false;

$(window).on('action:ajaxify.end', function () {
	function getInsCode(clientId, dataId, customClass, style, format) {
		var ad = '<div class="adsensewrapper" style="text-align:center;"><ins class="adsbygoogle ' + customClass + '" style="display:block; margin-bottom:15px;' + style + ' " data-ad-format="' + format + '" data-ad-client="ca-' + clientId + '" data-ad-slot="' + dataId + '"></ins></div>';
		return ad;
	}

	function placeSideAd(pull, margin) {
		var height = $('.posts >li:first-child .content').height();
		var width = 300;
		var type = 'vertical';
		if (height < 250) {
			type = 'rectangle';
			width = 250;
		}

		$('.posts >li:first-child .content').prepend(getInsCode(config.googleAdsense.client_id, config.googleAdsense.first_post_id, 'pull-' + pull, 'width:' + width + 'px;  margin-' + margin + ':30px;', type));
	}

	if (ajaxify.data.template.login || ajaxify.data.template.register) {
		return;
	}

	if (config.googleAdsense.isInAdFreeGroup) {
		return;
	}
	$.getScript('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', function () {
		// If ad in header is enabled
		if (config.googleAdsense.header_id && !loaded) {
			$(getInsCode(config.googleAdsense.client_id, config.googleAdsense.header_id, '', 'margin:15px auto;', 'auto')).insertBefore('#content');
			(adsbygoogle = window.adsbygoogle || []).push({});
		}

		// If ad in footer is enabled
		if (config.googleAdsense.footer_id && !loaded) {
			$(getInsCode(config.googleAdsense.client_id, config.googleAdsense.footer_id, '', 'margin:15px auto;', 'auto')).insertAfter('#content');
			(adsbygoogle = window.adsbygoogle || []).push({});
		}

		if (ajaxify.data.template.topic) {
			if (config.googleAdsense.after_first_post_id) {
				$('.posts >li:first-child').after('<li>' + getInsCode(config.googleAdsense.client_id, config.googleAdsense.after_first_post_id, '', 'margin: 15px auto', 'auto') + '</li>');
				(adsbygoogle = window.adsbygoogle || []).push({});
			}
			if (config.googleAdsense.first_post_id) {
				switch (config.googleAdsense.first_post_position) {
				case 'bottom':
					$('.posts >li:first-child .content').append(getInsCode(config.googleAdsense.client_id, config.googleAdsense.first_post_id, '', 'margin:15px auto;', 'auto'));
					break;

				case 'top':
					$('.posts >li:first-child .content').prepend(getInsCode(config.googleAdsense.client_id, config.googleAdsense.first_post_id, '', 'margin:15px auto;', 'auto'));
					break;

				case 'left':
					placeSideAd('left', 'right');
					break;

				case 'right':
					placeSideAd('right', 'left');
					break;

				default:
					break;
				}
				(adsbygoogle = window.adsbygoogle || []).push({});
			}
		}
		loaded = true;
	});
});
