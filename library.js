'use strict';

const validator = require.main.require('validator');
const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');
const groups = require.main.require('./src/groups');

let app;
const Adsense = {};

/**
 * Called on `static:app.load`
 */
Adsense.onLoad = async function (params) {
	async function render(req, res) {
		const groupNames = await groups.getGroups('groups:createtime', 0, -1);
		const list = groupNames
			.filter(groupName => groupName && !groups.isPrivilegeGroup(groupName))
			.map(groupName => ({
				name: validator.escape(String(groupName)),
				value: validator.escape(String(groupName)),
			}));

		res.render('admin/plugins/google-adsense', { groups: list });
	}

	app = params.app;

	params.router.get('/admin/plugins/google-adsense', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/google-adsense', render);
};

/**
 * Called on `filter:config.get`
 */
Adsense.onConfigGet = async function (config) {
	try {
		config.googleAdsense = await meta.settings.get('google-adsense');
	} catch (err) {
		winston.error('[adsense] onConfigGet error', err);
	}
	return config;
};

Adsense.admin = {};

/**
 * Called on `filter:admin.header.build`
 */
Adsense.admin.menu = async function (custom_header) {
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
		await meta.settings.setOnEmpty('google-adsense', 'client_id', '');
	}
};

Adsense.widget = {};

/**
 * Called on `filter:widgets.getWidgets`
 */
Adsense.widget.defineWidgets = async function (widgets) {
	widgets.push({
		widget: 'adsense-widget',
		name: 'Google AdSense',
		description: 'Easily place ads on your forum',
		content: await app.renderAsync('admin/widgets/adsense-widget', {}),
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
			blockId: widget.templateData.template.blockId,
		});
	} catch (err) {
		winston.error('[adsense] error', err);
	}

	return widget;
};

module.exports = Adsense;
