
import bodyParser from 'body-parser';
import { auth as authController } from "../controllers/auth.js";

export var auth = (function () {

	return {
		init: function (app) {
			var jsonParser = bodyParser.json();

			// get a auth by ID
			app.post("/api/auth/login", jsonParser, authController.login);

			app.post("/api/auth/logout", jsonParser, authController.logout);

			app.get("/api/auth/refresh", jsonParser, authController.refresh);

		}
	}
})();
