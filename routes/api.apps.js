import { interceptor } from '../interceptors/httpinterceptor.js';
import { apps as appcontroller } from "../controllers/apps.js";

import bodyParser from 'body-parser';

export var apps = (function () {
	return {
		init: function (app) {
			var jsonParser = bodyParser.json();

			// create a new app
			app.post("/api/app", jsonParser, appcontroller.create);

			// get an app by ID
			app.get("/api/app/:ID", appcontroller.read);

			// update an aop
			app.put("/api/app/:ID", jsonParser, appcontroller.update);

			//delete an app
			app.delete("/api/app/:ID", appcontroller.delete);
		}
	}
})();
