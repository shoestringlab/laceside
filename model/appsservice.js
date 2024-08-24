import { appsdao as dao } from './appsdao.js';
import { appsgateway as gateway } from './appsgateway.js';

export var appsservice = (function () {
	return {
		getApps: function (userID) {
			return (gateway.getApps(userID));
		},
		create: function (appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries) {
			return (dao.create(appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries));
		},
		read: function (appID) {
			return (dao.read(appID));
		},
		update: function (appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries) {
			return (dao.update(appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries));
		},
		delete: function (appID, userID) {
			return (dao.delete(appID, userID));
		}
	};
})();

