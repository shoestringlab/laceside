import { a7 } from '/lib/altseven/dist/a7.js';
//import {ui} from '/js/app.ui.js';
//import {main} from '/js/app.main.js';
import * as utils from '/js/app.utils.js';

export var appLibraryEvents = function init() {

	a7.events.subscribe("applibraries.create", function (obj) {
		a7.remote.invoke("applibraries.create", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				console.log(json);

				//update the model
				let apps = a7.model.get("appList");
				//update userApps
				let userApps = a7.ui.getView("userApps");
				let state = userApps.getState();
				let app = null;
				app = apps.get( obj.appID );
				let libs = [];
				if( app.libraries.length )	
					libs = app.libraries.split(",");

				libs.push(obj.libraryID);
				app.libraries = libs.toString();
				state.app = app;
				// update the libraries associated with the app
				/* for (var ix = 0; ix < apps.size; ix++) {
					app = apps[ix];
					if (app.appID === obj.appID) {
						let libs = app.libraries.split(",");
						libs.push(obj.libraryID);
						app.libraries = libs.toString();
						state.app = app;
					}
				} */
				a7.model.set("appList", apps);
				userApps.setState(state);
			});
	});

	a7.events.subscribe("applibraries.delete", function (obj) {
		a7.remote.invoke("applibraries.deleteAppLibrary", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				console.log(json);
				//update the model
				let apps = a7.model.get("appList");
				let userApps = a7.ui.getView("userApps");
				let state = userApps.getState();
				let app = null;
				// update the libraries associated with the app
				app = apps.get( obj.appID );
				let libs = app.libraries.split(",");
				libs.splice(libs.indexOf(obj.libraryID), 1);
				app.libraries = libs.toString();
				state.app = app;
			/* 	for (var ix = 0; ix < apps.size; ix++) {
					app = apps[ix];
					if (app.appID === obj.appID) {
						let libs = app.libraries.split(",");
						libs.splice(libs.indexOf(obj.libraryID), 1);
						app.libraries = libs.toString();
						state.app = app;
					}
				} */
				
				a7.model.set("appList", apps);
				userApps.setState(state);
			});
	});
};
