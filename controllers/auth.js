
import { userservice } from '../model/userservice.js';
import { utils } from '../model/utils.js';
import { Base64 } from 'js-base64';
import crypto from 'crypto';


export var auth = {

	login: function (request, response) {
		let authorization = request.header("Authorization") || "";
		let username = "";
		let password = "";
		if (authorization.length) {
			let authArray = authorization.split(" ");
			authorization = Base64.decode(authArray[1]);
			username = authorization.split(":")[0];
			password = authorization.split(":")[1];
		}
		
		userservice.getByUsername(username)
			.then(function (results) {
				let valid = false;
				if (results) {
					let hash = 	crypto.pbkdf2Sync(password, results.salt, 1000, 64, `sha512`).toString(`hex`);
					valid = ( hash === results.hash );
				}
				if (valid) {
					let user = results;
					// remove the hash and salt from the token so we don't send it outside the system
					delete user.hash;
					delete user.salt;
					response.setHeader("X-Token", utils.generateToken(user));
					response.send({ user: user, success: true });
				} else {
					throw ({ success: false, error: "Invalid username/password combination." });
				}
			})
			.catch(function (error) {
				console.log(error);
				response.send(JSON.stringify(error));
			});
	},
	logout: function (request, response) {
		response.send({ success: true });
	},
	refresh: function (request, response) {
		//let token = request.header( "X-Token" );
		response.send({ success: true });
	}
};
