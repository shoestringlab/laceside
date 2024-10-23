import { librariesservice } from '../model/librariesservice.js';
import { applibrariesservice } from '../model/applibrariesservice.js';
import {createId} from '@paralleldrive/cuid2';

export var libraries = (function () {
	return {
		getLibraries: function (request, response) {
			librariesservice.getLibraries(request.user.userID)
				.then(function (results) {
					let libs = new Map();


					results.forEach(result => {
						libs[result.libraryID] = result;
					});
					response.setHeader("Cache-Control", "no-cache");
					response.send(JSON.stringify(libs));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		getByUserID: function (request, response) {
			librariesservice.getLibraries(request.params.ID)
				.then(function (results) {
					let libs = new Map();

					results.forEach(result => {
						libs[result.libraryID] = result;
					});
					response.setHeader("Cache-Control", "no-cache");
					response.send(JSON.stringify(libs));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		create: function (request, response) {
			
			let libraryID = createId();

			librariesservice.create(libraryID, request.user.userID, request.body.link, request.body.name)
				.then(function (results) {
					//we are reading back the inserted row
					librariesservice.read(results)
						.then(function (library) {
							response.send(JSON.stringify(library));
						})
						.catch(function (error) {
							console.log(error);
							response.send(JSON.stringify(error));
						});
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		read: function (request, response) {
			librariesservice.read(request.params.ID)
				.then(function (results) {
					response.send(JSON.stringify(results));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		update: function (request, response) {
			//response.send( JSON.stringify( request.body ) );
			librariesservice.update(request.params.ID, request.user.userID, request.body.link, request.body.name)
				.then(function (results) {
					//we are reading back the updated row
					librariesservice.read(request.params.ID)
						.then(function (library) {
							response.send(JSON.stringify(library));
						})
						.catch(function (error) {
							console.log(error);
							response.send(JSON.stringify(error));
						});
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		delete: function (request, response) {
			applibrariesservice.deleteByLibraryID(request.params.ID, request.user.userID)
				.then(function (success) {
					librariesservice.delete(request.params.ID, request.user.userID)
						.then(function (success) {
							response.send(JSON.stringify(success));
						})
						.catch(function (error) {
							console.log(error);
							response.send(JSON.stringify(error));
						});
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		}
	};

})();
