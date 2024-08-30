import { a7 } from '/lib/altseven/dist/a7.js';
import { ui } from '/js/app.ui.js';
import { main } from '/js/app.main.js';

export const auth = (function () {
	"use strict";

	// this function performs a refresh against the server and returns true or false based on whether the current user is logged in.
	// the auth token is stored in sessionStorage, so even if the browser is refreshed, the token will be available
	var _isAuthenticated = function ( handler ) {
		let promise = new Promise(function (resolve, reject) {
			// check whether user is authenticated
			a7.security.isAuthenticated(resolve, reject);
		});

		promise.then(function ( authenticated ) {
			// run the handler function 
			handler( authenticated );
		});
	},
	
	_isCurrentUserAnon = function(){
		// check whether there is a valid logged in user in the model
		let user = a7.model.get("user");
		if( user === undefined || user === null || user.userID === undefined || user.userID === null ){
			return true;
		}
		if( user.userID.length > 0 ) return false;
	};



	var _logout;

	return {
		isAuthenticated: _isAuthenticated,
		isCurrentUserAnon: _isCurrentUserAnon
		/* loginHandler: function (json) {

			//let user = a7.model.get("user");
			if (json.success) {
				
				a7.ui.views['header'].setState({ user: user });
			}
			main.run(user);
		} */
	};
})();
