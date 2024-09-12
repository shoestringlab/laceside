import { a7 } from '/lib/altseven/dist/a7.js';
import { cuid } from '/libs/cuid/index.mjs';

export { getCurrentUser, getByUsername, getUserLibraries, getUserApps, checkEmail, sendResetEmail, checkUsername, checkPassword, changePassword, getPasswordReset, resetPassword, create, update, confirm };

var getCurrentUser = function (obj) {
	var params = { method: 'GET' };
	return a7.remote.fetch("/api/u/user", params, true);
}	,
	getByUsername = function (obj) {
		var params = { method: 'GET' };
		return a7.remote.fetch("/api/u/username/" + obj.username, params, true);
	},
	getUserLibraries = function (obj) {
		var params = { method: 'GET' };
		return a7.remote.fetch("/api/user/" + obj.user.userID + "/libraries", params, true);
	},
	getUserApps = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/user/" + obj.user.userID + "/apps", params, true);
	},
	getUserData = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/user/" + obj.user.userID + "/data", params, true);
	},
	checkEmail = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/email/" + obj.emailAddress, params, true);
	},
	sendResetEmail = function (obj) {
		var request;

		var params = {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				emailAddress: obj.emailAddress
			})
		};

		return a7.remote.fetch("/api/user/sendresetemail", params, true);
	},
	checkUsername = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/u/username/" + obj.username + "?returnType=boolean", params, true);
	},
	checkPassword = function (obj) {
		let params = {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({ currentPassword: obj.currentPassword })
		};
		return a7.remote.fetch("/api/u/username/" + obj.username + "/checkpassword", params, true);
	},
	changePassword = function (obj) {
		let params = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({ newPassword: obj.newPassword })
		};
		return a7.remote.fetch("/api/user/" + obj.user.userID + "/changePassword", params, true);
	},
	getPasswordReset = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/user/passwordreset/" + obj.resetID, params, true);
	},
	resetPassword = function (obj) {
		var params = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				newPassword: obj.newPassword
			})
		};

		return a7.remote.fetch("/api/user/passwordreset/" + obj.resetID, params, true);
	},

	create = function (obj) {
		var request;

		var params = {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				firstName: obj.firstName,
				lastName: obj.lastName,
				username: obj.username,
				password: obj.password,
				emailAddress: obj.email,
				nickName: obj.nickName
			})
		};

		return a7.remote.fetch("/api/user/" + cuid(), params, true);
	},
	update = function (obj) {
		var request;

		var params = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({
				firstName: obj.firstName,
				lastName: obj.lastName,
				nickName: obj.nickName,
				emailAddress: obj.emailAddress
			})
		};

		return a7.remote.fetch("/api/user/" + obj.userID, params, true);
	},
	confirm = function (obj) {
		var request;

		var params = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			}
		};

		return a7.remote.fetch("/api/userconfirmation/" + obj.userConfirmationID, params, true);
	};
