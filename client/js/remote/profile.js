import { a7 } from '/lib/altseven/dist/a7.js';

export { update };

var update = function (obj) {

	var request;

	var params = {
		method: 'PUT',
		headers: {
			'Accept': 'application/json, application/xml, text/play, text/html, *.*',
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({
			profilePic: obj.profilePic
		})
	};

	return a7.remote.fetch("/api/userprofile/" + obj.userID, params, true);
};
