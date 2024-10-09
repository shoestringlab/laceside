import { interceptor } from '../interceptors/httpinterceptor.js';
import { applibraries as applibrariescontroller } from "../controllers/applibraries.js";

import bodyParser from 'body-parser';

export var applibraries = (function () {
	return {
		init: function (app) {
			var jsonParser = bodyParser.json();

			// create a new app
			app.post("/api/applibraries", jsonParser, applibrariescontroller.create);

			//delete an app
			app.delete("/api/applibraries/:appID/:libraryID", applibrariescontroller.delete);
		}
	}
})();
