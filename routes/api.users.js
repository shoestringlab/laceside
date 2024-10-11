import { interceptor } from '../interceptors/httpinterceptor.js';
import { apps as appcontroller } from "../controllers/apps.js";
import { libraries as librarycontroller } from "../controllers/libraries.js";
import { users as usercontroller } from "../controllers/users.js";
import bodyParser from 'body-parser';

export var users = (function () {
	return {
		init: function (app) {
			var jsonParser = bodyParser.json();

			// get current user
			app.get("/api/user", usercontroller.getCurrentUser);

			// get a user by ID
			app.get("/api/user/:ID", usercontroller.read);

			//update a user
			app.put("/api/user/:ID", jsonParser, usercontroller.update);

			// check a user password
			app.post("/api/user/:ID/checkPassword", jsonParser, usercontroller.checkPassword);

			// update password
			app.put("/api/user/:ID/changePassword", jsonParser, usercontroller.changePassword);

			// get apps by userID
			app.get("/api/user/:ID/apps", appcontroller.getByUserID);

			// get libraries for a user
			app.get("/api/user/:ID/libraries", librarycontroller.getByUserID);

			//update a user profile
			app.put("/api/user/:ID/profile", jsonParser, userprofilecontroller.update);

			//delete a user
			//  app.delete( "/api/user/:ID", usercontroller.delete );

			// public methods start with /api/u/


			// send reset email
			app.post("/api/u/sendresetemail", jsonParser, usercontroller.sendResetEmail);

			// get a password reset object
			app.get("/api/u/passwordreset/:ID", usercontroller.getPasswordReset);

			// update the password
			app.put("/api/u/passwordreset/:ID", jsonParser, usercontroller.resetPassword);

			// confirm a user
			app.put("/api/u/userconfirmation/:ID", usercontroller.confirmUser);

			// get all users
			//app.get("/api/users", usercontroller.getAll);

			// check if an email address is in the system
			app.get("/api/u/email/:emailAddress", usercontroller.getEmailAddress);

			// create a new user
			app.post("/api/u", jsonParser, usercontroller.create);

			// get a user by ID
			app.get("/api/u/username/:username", usercontroller.getUserByUsername);

		}
	}
})();
