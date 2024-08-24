import { interceptor } from '../interceptors/httpinterceptor.js';
import { files as filecontroller } from "../controllers/files.js";
import bodyParser from 'body-parser';

export var files = (function () {
	return {
		init: function (app) {
			let options = {
				inflate: true,
				limit: '1024kb',
				type: 'application/octet-stream'
			};
			let rawParser = bodyParser.raw(options);

			// upload a file
			app.post("/api/files", rawParser, filecontroller.upload);
		}
	}
})();
