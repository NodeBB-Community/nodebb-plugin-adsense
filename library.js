'use strict';

const validator = require('validator');

const meta = require.main.require('./src/meta');
const groups = require.main.require('./src/groups');

const Adsense = module.exports;

Adsense.onConfigGet = async function (config) {
	const settings = await meta.settings.get('google-adsense');
	config.googleAdsense = settings;
	const adFreeGroups = JSON.parse(settings.adFreeGroups || '[]');
	const isMemberOfAdFreeGroups = await groups.isMemberOfGroups(config.uid, adFreeGroups);
	config.googleAdsense.isInAdFreeGroup = isMemberOfAdFreeGroups.includes(true);
	return config;
};

Adsense.admin = {};
Adsense.admin.menu = function (custom_header) {
	custom_header.plugins.push({
		route: '/plugins/google-adsense',
		icon: 'fa-usd',
		name: 'Google Adsense',
	});
	return custom_header;
};

Adsense.admin.onLoad = async function (params) {
	const helpers = require.main.require('./src/routes/helpers');
	helpers.setupAdminPageRoute(params.router, '/admin/plugins/google-adsense', params.middleware, [], async (req, res) => {
		let groupNames = await groups.getGroups('groups:createtime', 0, -1);
		groupNames = groupNames.filter(groupName => groupName && !groups.isPrivilegeGroup(groupName))
			.map(groupName => ({
				name: validator.escape(String(groupName)),
				value: validator.escape(String(groupName)),
			}));
		res.render('admin/plugins/google-adsense', {
			groups: groupNames,
		});
	});
};

Adsense.admin.activate = async function (data) {
	if (data.id === 'nodebb-plugin-google-adsense') {
		const defaults = {
			client_id: '',
			header_id: '',
			footer_id: '',
			after_first_post_id: '',
			first_post_position: 'bottom',
			first_post_id: '',
		};
		await meta.settings.setOnEmpty('google-adsense', defaults);
	}
};
