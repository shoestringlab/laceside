import { a7 } from '/lib/altseven/dist/a7.js';

export { getCurrentUser, getUserByUsername, getUserLibraries, getUserApps, checkEmail, sendResetEmail, checkUsername, checkPassword, changePassword, getPasswordReset, resetPassword, create, update, confirm };
// SECURED METHODS - require a logged in user, and in some cases only the current user 
var getCurrentUser = function (obj) {
	var params = { method: 'GET' };
	return a7.remote.fetch("/api/user", params, true);
	},
	getUserLibraries = function (obj) {
		var params = { method: 'GET' };
		return a7.remote.fetch("/api/user/" + obj.user.userID + "/libraries", params, true);
	},
	getUserApps = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/user/" + obj.user.userID + "/apps", params, true);
	},
	// open route, so this call returns onl public data
	getUserByUsername = function (obj) {
		var params = { method: 'GET' };
		return a7.remote.fetch("/api/u/username/" + obj.username, params, true);
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

		return a7.remote.fetch("/api/u/sendresetemail", params, true);
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
		return a7.remote.fetch("/api/user/" + obj.userID + "/checkpassword", params, true);
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

	// OPEN METHODS - can be accessed by anonymous users
	checkEmail = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/u/email/" + obj.emailAddress, params, true);
	},
	checkUsername = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/u/username/" + obj.username + "?returnType=boolean", params, true);
	},
	getPasswordReset = function (obj) {
		let params = { method: 'GET' };
		return a7.remote.fetch("/api/u/passwordreset/" + obj.resetID, params, true);
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

		return a7.remote.fetch("/api/u/passwordreset/" + obj.resetID, params, true);
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

		return a7.remote.fetch("/api/u", params, true);
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

		return a7.remote.fetch("/api/u/userconfirmation/" + obj.userConfirmationID, params, true);
	};
