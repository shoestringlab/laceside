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
				var libraries = a7.model.get("libraries");
				libraries.push(library);
				a7.model.set("libraries", libraries);

				a7.ui.getView('libraries').setState({ libraries: a7.model.get("libraries"), library: library, offset: 0 });

				utils.showNotice("New library saved.");

			});
	});

	a7.events.subscribe("library.update", function (obj) {
		a7.remote.invoke("libraries.update", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				var library = json;

				var libraries = a7.model.get("libraries");
				for (var ix = 0; ix < libraries.length; ix++) {
					if (libraries[ix].libraryID === library.libraryID) {
						libraries[ix] = library;
						break;
					}
				}
				a7.model.set("libraries", libraries);
				a7.ui.getView('libraries').setState({ libraries: a7.model.get("libraries"), library: library, offset: 0 });
				utils.showNotice("Library saved.");
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
					var libraries = a7.model.get("libraries");

					var deleted = libraries.find(function (library, idx) {
						if (library.libraryID === parseInt(obj.libraryID, 10)) {
							libraries.splice(idx, 1);
							return true;
						}
					});
				}

				a7.model.set("libraries", libraries);
				a7.ui.getView('libraries').setState({ libraries: a7.model.get("libraries"), library: { libraryID: 0, name: "", link: "" }, offset: 0 });

				utils.showNotice("Library deleted.");
			});
	});

	a7.events.subscribe("library.new", function (obj) {
		let libsState = a7.ui.getView('libraries').getState();
		a7.ui.getView('libraries').setState({ libraries: a7.model.get("libraries"), library: { libraryID: 0, name: "", link: "" }, activeLibraries: a7.model.get("activeLibraries"), offset: libsState.offset });
	});

};
