import { interceptor } from '../interceptors/httpinterceptor.js';
import { userprofiles as userprofilecontroller } from "../controllers/userprofiles.js";
import bodyParser from 'body-parser';

export var userprofiles = (function () {
	return {
		init: function (app) {
			var jsonParser = bodyParser.json();

			//update a user profile
			app.put("/api/user/profile/:ID", jsonParser, userprofilecontroller.update);
		}
	}
})();
