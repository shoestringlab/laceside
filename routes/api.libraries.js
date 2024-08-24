import { interceptor } from '../interceptors/httpinterceptor.js';
import { libraries as librarycontroller } from "../controllers/libraries.js";

import bodyParser from 'body-parser';

export var libraries = (function () {
	return {
		init: function (app) {
			var jsonParser = bodyParser.json();

			// create a new library
			app.post("/api/library", jsonParser, librarycontroller.create);

			// get a library by ID
			app.get("/api/library/:ID", librarycontroller.read);

			// update a library
			app.put("/api/library/:ID", jsonParser, librarycontroller.update);

			//delete a library
			app.delete("/api/library/:ID", librarycontroller.delete);
		}
	}
})();
