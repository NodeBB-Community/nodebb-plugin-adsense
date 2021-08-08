'use strict';

const validator = require.main.require('validator');
const winston = require.main.require('winston');
const meta = require.main.require('./src/meta');
const groups = require.main.require('./src/groups');

const Adsense = {};

/**
 * Called on `filter:config.get`
 */
Adsense.onConfigGet = async function (config) {
	try {
		const settings = await meta.settings.get('google-adsense');
		if (!settings) {
			return config;
		}

		config.googleAdsense = settings;

		const adFreeGroups = JSON.parse(settings.adFreeGroups || '[]');
		config.googleAdsense.isInAdFreeGroup = await groups.isMemberOfAny(config.uid, adFreeGroups);
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
 * Called on `static:app.load`
 */
Adsense.admin.onLoad = async function (params) {
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

	params.router.get('/admin/plugins/google-adsense', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/google-adsense', render);
};

/**
 * Called on `action:plugin.activate`
 */
Adsense.admin.activate = async function (data) {
	if (data.id !== 'nodebb-plugin-google-adsense') {
		return;
	}

	const defaults = [
		{ field: 'client_id', value: '' },
		{ field: 'header_id', value: '' },
		{ field: 'footer_id', value: '' },
		{ field: 'after_first_post_id', value: '' },
		{ field: 'first_post_position', value: 'bottom' },
		{ field: 'first_post_id', value: '' },
	];

	let promises = Promise.resolve();
	defaults.forEach((optObj) => {
		promises = promises.then(() => meta.settings.setOnEmpty('google-adsense', optObj.field, optObj.value));
	});
	await promises;
};

module.exports = Adsense;
