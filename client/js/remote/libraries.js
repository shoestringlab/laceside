import { a7 } from '/lib/altseven/dist/a7.js';
import { cuid } from '/lib/cuid/index.mjs';

export { create, read, update, deleteById };

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
			libraryID: cuid(),
			name: obj.name,
			link: obj.link
		})
	};

	return a7.remote.fetch("/api/library", params, true);
},
	read = function (obj) {
		var request;

		var params = {
			method: 'GET',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			}
		};

		return a7.remote.fetch("/api/library/" + obj.library.libraryID, params, true);

		/*     promise
			  .then( function( response ) {
				// get json response and pass to handler to resolve
				return response.json();
			  })
			  .then( function( json ){
		
			  }); */
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
				name: obj.name,
				link: obj.link
			})
		};

		return a7.remote.fetch("/api/library/" + obj.libraryID, params, true);
	},
	deleteById = function (obj) {
		var request;

		var params = {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json, application/xml, text/play, text/html, *.*',
				'Content-Type': 'application/json; charset=utf-8'
			}
		};

		return a7.remote.fetch("/api/library/" + obj.libraryID, params, true);
	};
