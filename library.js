'use strict';

const validator = require('validator');

const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');
const groups = require.main.require('./src/groups');

const Adsense = module.exports;
Adsense.widget = {};
Adsense.admin = {};

let app;

/**
 * Called on `static:app.load`
 */
Adsense.onLoad = async function (params) {
	const helpers = require.main.require('./src/routes/helpers');

	app = params.app;

	helpers.setupPageRoute(params.router, '/ads.txt', async (req, res, next) => {
		const { adstxt } = await meta.settings.get('google-adsense');
		if (!adstxt) {
			return next();
		}
		res.send(validator.escape(String(adstxt)));
	});

	helpers.setupAdminPageRoute(params.router, '/admin/plugins/google-adsense', [], async (req, res) => {
		let groupNames = await groups.getGroups('groups:createtime', 0, -1);
		groupNames = groupNames.filter(groupName => groupName && !groups.isPrivilegeGroup(groupName))
			.map(groupName => ({
				name: validator.escape(String(groupName)),
				value: validator.escape(String(groupName)),
			}));
		res.render('admin/plugins/google-adsense', {
			groups: groupNames,
			title: 'Google Adsense',
		});
	});
};


Adsense.onConfigGet = async function (config) {
	config.googleAdsense = await meta.settings.get('google-adsense');
	return config;
};


Adsense.admin.menu = function (custom_header) {
	custom_header.plugins.push({
		route: '/plugins/google-adsense',
		icon: 'fa-usd',
		name: 'Google Adsense',
	});
	return custom_header;
};

/**
 * Called on `action:plugin.activate`
 */
Adsense.admin.activate = async function (data) {
	if (data.id === 'nodebb-plugin-google-adsense') {
		const defaults = { client_id: '' };
		await meta.settings.setOnEmpty('google-adsense', defaults);
	}
};

/**
 * Called on `filter:widgets.getWidgets`
 */
Adsense.widget.defineWidgets = async function (widgets) {
	widgets.push({
		widget: 'adsense-widget',
		name: 'Google AdSense',
		description: 'Easily place ads on your forum',
		content: await app.renderAsync('admin/plugins/widgets/adsense-widget', {}),
	});
	return widgets;
};

/**
 * Called on `filter:widget.render:adsense-widget`
 */
Adsense.widget.renderAdsense = async function (widget) {
	try {
		const settings = await meta.settings.get('google-adsense');

		const adFreeGroups = JSON.parse(settings.adFreeGroups || '[]');
		const isInAdFreeGroup = await groups.isMemberOfAny(widget.uid, adFreeGroups);
		if (isInAdFreeGroup) {
			return null;
		}

		widget.html = await app.renderAsync('widgets/adsense-widget', {
			clientId: settings.client_id,
			blockId: widget && widget.data && widget.data.blockId,
		});
	} catch (err) {
		winston.error('[adsense] error', err);
	}

	return widget;
};
