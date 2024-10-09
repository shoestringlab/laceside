import { a7 } from '/lib/altseven/dist/a7.js';
//import {ui} from '/js/app.ui.js';
//import {main} from '/js/app.main.js';
import * as utils from '/js/app.utils.js';

export var libraryEvents = function init() {

	a7.events.subscribe("library.create", function (obj) {
		a7.remote.invoke("libraries.create", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				var library = json;
				var libraries = a7.model.get("libraryList");
				libraries.push(library);
				a7.model.set("libraryList", libraries);

				utils.showNotice("New library saved.");
			});
			// update the app list and library list 
			a7.ui.getView('userApps').fireEvent("mustRender");
			a7.ui.getView('userLibs').fireEvent("mustRender");
	});

	a7.events.subscribe("library.update", function (obj) {
		a7.remote.invoke("libraries.update", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				var library = json;

				var libraries = a7.model.get("libraryList");
				for (var ix = 0; ix < libraries.length; ix++) {
					if (libraries[ix].libraryID === library.libraryID) {
						libraries[ix] = library;
						break;
					}
				}
				a7.model.set("libraryList", libraries);
				utils.showNotice("Library saved.");
				// update the app list and library list 
				a7.ui.getView('userApps').fireEvent("mustRender");
				a7.ui.getView('userLibs').fireEvent("mustRender");
			});
	});

	a7.events.subscribe("library.delete", function (obj) {
		a7.remote.invoke("libraries.deleteById", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				if (json) {
					var libraries = a7.model.get("libraryList");
					var deleted = libraries.filter( library => library.libraryID !== obj.libraryID );
				}

				a7.model.set("libraryList", deleted);
				//update userlibs
				
				a7.ui.getView('userLibs').setState( a7.ui.getView('userLibs').getBaseState() );
				utils.showNotice("Library deleted.");
				// update the app list and library list 
				a7.ui.getView('userApps').fireEvent("mustRender");
				//a7.ui.getView('userLibs').fireEvent("mustRender");
			});
	});

	a7.events.subscribe("library.new", function (obj) {
	});

};
