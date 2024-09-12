import { securityConfig } from "../config/securityconfig.js";
import { utils } from '../model/utils.js';
import { userservice } from '../model/userservice.js';

function notAuthorized(request, response) {
	response.status(401);
	response.send(JSON.stringify({ error: "Not authorized." }));
}

export var interceptor = (function () {
	return {
		checkHTTPAuth: function (request, response, next) {
			
			// is it an open route?
			let openRoute = securityConfig.routes.open.find(function (route) {
				//console.log( "route: " + route );
				return request.url.match(route);
			});

			// is it a secured route?
			let securedRoute = securityConfig.routes.secured.find(function (route) {
				//console.log( "route: " + route );
				return request.url.match(route);
			});

			console.log("Checking auth");
			// check token
			let token = request.headers["x-token"];
			// anonymous access
			if (token === undefined || token.length === 0) {
				// not a logged in user
				if (openRoute !== undefined) {
					// if this is an open route, pass them along
					next();
				} else if (securedRoute !== undefined) {
					notAuthorized(request, response);
				} else {
					// route not found
					console.log("WARN: Route not found for URL:" + request.url);
					console.log("Pass through allowed.");
					next();
				}
			} else {
				let auth = utils.checkAuthToken(token, securityConfig.ttl);

				userservice.read(auth.userID)
					.then(function (results) {
						let valid = false;
						let user = results;
						let now = new Date();
						console.log("userID: " + user.userID);
						let expires = new Date(auth.expires).getTime() ;
						let nowtime = now.getTime();
						console.log( "sessiontime: " + expires - nowtime );
						// if there is a valid logged in user, pass them
						if (user.userID.length > 0 && (new Date(auth.expires).getTime() - now.getTime() > 0)) {
							valid = true;
							// remove the password hash from the token so we don't send it outside the system
							delete user.hash;

							// this call sets a user into the request
							request.user = user;
							// set a new header token
							response.setHeader("X-Token", utils.generateToken(user));
							console.log("X-Token set");
							// move on to the route handlers
							//next();
						} else if (user.userID.length > 0) {
							console.log("Expires: " + new Date(auth.expires).getTime());
							console.log("Now: " + now.getTime());
							console.log("Authorization expired.");
							response.messages = "Authorization expired.";
						}

						if (securedRoute !== undefined) {
							console.log(request.url + " matches " + securedRoute);
							console.log("User validated? " + valid);
							if (valid === true) {
								// securedRoute and logged in user, forward them along
								next();
							} else {
								notAuthorized(request, response);
							}
						} else {

							if (openRoute === undefined) {
								console.log("WARN: Route not found for URL:" + request.url);
								console.log("Pass through allowed.");
							}
							// open routes pass through
							next();
						}
					})
					.catch(function (error) {
						console.log(error);
						response.status(500);
						response.send("Error");
					});
			}
		}
	}
})();
