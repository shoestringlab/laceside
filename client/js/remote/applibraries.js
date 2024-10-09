import { a7 } from '/lib/altseven/dist/a7.js';

export { create, deleteAppLibrary };

var create = function (obj) {
	var request;

	var params = {
		method: 'POST',
		//encoding: 'application/x-www-form-urlencoded',
		headers: {
			'Accept': 'application/json, application/xml, text/play, text/html, *.*',
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({
			appID: obj.appID,
			libraryID: obj.libraryID
		})
	};

	return a7.remote.fetch("/api/applibraries", params, true);

}, deleteAppLibrary = function (obj) {
	var request;

	var params = {
		method: 'DELETE',
		//encoding: 'application/x-www-form-urlencoded',
		headers: {
			'Accept': 'application/json, application/xml, text/play, text/html, *.*',
			'Content-Type': 'application/json; charset=utf-8'
		}
	};

	return a7.remote.fetch("/api/applibraries/" + obj.appID + "/" + obj.libraryID, params, true);

};
