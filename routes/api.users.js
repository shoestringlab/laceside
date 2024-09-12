import { interceptor } from '../interceptors/httpinterceptor.js';
import { apps as appcontroller } from "../controllers/apps.js";
import { libraries as librarycontroller } from "../controllers/libraries.js";
import { users as usercontroller } from "../controllers/users.js";
import bodyParser from 'body-parser';

export var users = (function () {
	return {
		init: function (app) {
			var jsonParser = bodyParser.json();

			// send reset email
			app.post("/api/user/sendresetemail", jsonParser, usercontroller.sendResetEmail);

			// get a password reset object
			app.get("/api/user/passwordreset/:ID", usercontroller.getPasswordReset);

			// update the password
			app.put("/api/user/passwordreset/:ID", jsonParser, usercontroller.resetPassword);

			// create a new user
			app.post("/api/user/:ID", jsonParser, usercontroller.create);

			// get a user by ID
			app.get("/api/user/:ID", usercontroller.read);

			// update password
			app.put("/api/user/:ID/changePassword", jsonParser, usercontroller.changePassword);

			//update a user
			app.put("/api/user/:ID", jsonParser, usercontroller.update);

			//delete a user
			//  app.delete( "/api/user/:ID", usercontroller.delete );

			// confirm a user
			app.put("/api/userconfirmation/:ID", usercontroller.confirmUser);

			// get all users
			app.get("/api/users", usercontroller.getAll);

			// get apps by userID
			app.get("/api/user/:ID/apps", appcontroller.getByUserID);

			// get libraries for a user
			app.get("/api/user/:ID/libraries", librarycontroller.getByUserID);

			// check if an email address is in the system
			app.get("/api/email/:emailAddress", usercontroller.getEmailAddress);

			// get current user
			app.get("/api/u/user", usercontroller.getCurrentUser);

			// get a user by ID
			app.get("/api/u/username/:username", usercontroller.getByUsername);

			// check a user password
			app.post("/api/u/username/:username/checkPassword", jsonParser, usercontroller.checkPassword);

		}
	}
})();
