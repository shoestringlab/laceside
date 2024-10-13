
import { applibrariesservice as service } from '../model/applibrariesservice.js';
import { appsservice } from '../model/appsservice.js';

export var applibraries = {

	create: function (request, response) {
		appsservice.read(request.body.appID)
			.then(function (results) {
				
				if( results.userID === request.user.userID ){
					service.create( request.body.appID, request.body.libraryID, request.user.userID )
					.then( function( _results ){
						response.send(true);
					})
					.catch( function( _error ){
					  console.log( _error );
					  response.send( JSON.stringify( _error ) );
					});
				}else {
					response.setHeader("Status", "401");
					response.send("Not authorized");
				}
			})
			.catch(function (error) {
				console.log(error);
				response.send(JSON.stringify(error));
			});
	},

	delete: function (request, response) {
		appsservice.read(request.body.appID)
			.then(function (results) {
				
				if( results.userID === request.user.userID ){
					service.delete(request.params.appID, request.params.libraryID, request.user.userID)
						.then(function (success) {
							console.log( "Deleted applibrary." );
							console.dir( success );
							response.send(true);
						})
						.catch(function (error) {
							console.log(error);
							response.send(JSON.stringify(error));
						});
				}else {
					response.setHeader("Status", "401");
					response.send("Not authorized");
				}
			})
			.catch(function (error) {
				console.log(error);
				response.send(JSON.stringify(error));
			});
	}
};
