import { a7 } from '/lib/altseven/dist/a7.js';
import { auth } from '/js/app.auth.js';
import { Paging } from '/js/view/paging.js';
import * as utils from '/js/app.utils.js';

export var Libraries = function Libraries(props) {
	var libraries = a7.components.Constructor(a7.components.View, [props], true);

	libraries.state = {
		libraries: [],
		library: props.library || { libraryID: 0, name: "", link: "" },
		activeLibraries: [],
		offset: 0
	};

	libraries.isDirty = function () {
		let isDirty = false;
		let library = libraries.state.library;
		let currentName = libraries.element.querySelector("input[name='name']").value;
		let currentLink = libraries.element.querySelector("input[name='link']").value;
		if ((library.libraryID === 0 && (currentName.length || currentLink.length)) || (library.libraryID > 0 && (currentName !== library.name || currentLink !== library.link))) {
			isDirty = true;
		}
		return isDirty;
	},

		libraries.template = function () {
			let author = a7.model.get("author");
			let user = a7.model.get("user");

			let disabled = (libraries.state.library.name.length > 0 ? '' : 'disabled="disabled"');
			let offset = parseInt(libraries.state.offset, 10);

			let templ = `<form>`;

			if (user.userID === author.userID) {
				templ += `<input type="text" name="name" placeholder="Name - e.g. jQuery 3.4.0" value="${libraries.state.library.name}" data-oninput="checkSavable"/><br/>
                <input type="text" name="link" placeholder="URI - e.g. https://code.jquery.com/jquery-3.4.0.min.js" value="${libraries.state.library.link}"/><br/>
                <button name="save" type="button" data-onclick="saveLibrary" ${disabled}>Save</button>
                <button type="button" data-onclick="newLibrary">New</button>`;
			}

			for (var ix = offset; ix < Math.min(libraries.state.libraries.length, libraries.state.offset + 5); ix++) {
				let library = libraries.state.libraries[ix];
				templ += `<div class="row"><div class="inline">`;

				if (user.userID === author.userID) {
					templ += `<input type="checkbox" name="libraryID" value="${library.libraryID}" data-link="${library.link}" data-onClick="setLibrary"/><a name="lib" data-onClick="editLibrary" data-id="${library.libraryID}">${library.name}</a>
                </div>
                <a name="trash" data-id="${library.libraryID}" data-onclick="deleteLibrary">
                  <svg class="feather">
                  <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
                  </svg>
                </a></div>`;
				} else {
					templ += `<input type="checkbox" name="libraryID" value="${library.libraryID}" data-link="${library.link}" style="display:none;"/>${library.name}</div></div>`;
				}
			}

			templ += `</form>`;
			templ += ` <div class="paging"></div>`;
			a7.log.trace("libs offset: " + offset);
			Paging({ id: 'libsPaging', parentID: libraries.props.id, selector: libraries.props.selector + ' div.paging', records: libraries.state.libraries, offset: offset });

			return templ;
		};

	libraries.on("rendered", function () {
		let state = libraries.getState();
		let author = a7.model.get("author");
		let user = a7.model.get("user");
		let activeLibs = state.activeLibraries;
		//if( activeLibs ){
		state.libraries.forEach(function (lib) {
			let cbSelector = document.querySelector(libraries.props.selector + " input[type='checkbox'][value='" + lib.libraryID + "']");
			if (activeLibs !== undefined && activeLibs.filter(library => library.libraryID === lib.libraryID).length) {
				cbSelector.checked = true;
			} else {
				if (user.userID !== author.userID) {
					cbSelector.parentElement.parentElement.style = "display:none";
				}
			}
		});
		//}
	});

	libraries.eventHandlers = {
		checkSavable: function (event) {
			if (event.currentTarget.value.trim().length > 0) {
				libraries.element.querySelector("button[name='save']").removeAttribute("disabled");
			} else {
				libraries.element.querySelector("button[name='save']").setAttribute('disabled', 'disabled');
			}
		},
		saveLibrary: function (event) {
			if (libraries.state.library.libraryID === 0) {
				a7.events.publish("library.create", {
					name: document.querySelector(libraries.props.selector + " input[name='name']").value,
					link: document.querySelector(libraries.props.selector + " input[name='link']").value,
				});
			} else {
				a7.events.publish("library.update", {
					libraryID: libraries.state.library.libraryID,
					name: document.querySelector(libraries.props.selector + " input[name='name']").value,
					link: document.querySelector(libraries.props.selector + " input[name='link']").value,
				});
			}
		},
		editLibrary: function (event) {
			let dataId = event.currentTarget.attributes['data-id'].value;
			if (libraries.isDirty()) {
				let dlg = utils.showDialog(" &nbsp; ", "Your changes will be discarded, proceed?",
					[{
						label: 'Yes', click: function () {
							dlg.close();
							let library = libraries.state.libraries.filter(lib => lib.libraryID == dataId)[0];
							libraries.setState({ libraries: libraries.state.libraries, library: library, activeLibraries: libraries.state.activeLibraries, offset: libraries.state.offset });
						}
					},
					{
						label: "No", click: function () {
							dlg.close();
						}
					}
					]);
			} else {
				let library = libraries.state.libraries.filter(lib => lib.libraryID == dataId)[0];
				libraries.setState({ libraries: libraries.state.libraries, library: library, activeLibraries: libraries.state.activeLibraries, offset: libraries.state.offset });
			}

		},
		deleteLibrary: function (event) {
			let dlg = utils.showDialog(" &nbsp; ", "You are about to delete this library, proceed?",
				[{
					label: 'Yes', click: function () {
						dlg.close();
						a7.events.publish("library.delete", {
							libraryID: event.currentTarget.attributes['data-id'].value
						});
					}
				},
				{
					label: "No", click: function () {
						dlg.close();
					}
				}
				]);
		},
		setLibrary: function (event) {
			let activeLibs = a7.model.get("activeLibraries") || [];
			if (event.currentTarget.checked) {
				let lib = libraries.state.libraries.find(function (library) {
					if (library.libraryID === event.currentTarget.value) {
						return library;
					}
				});
				activeLibs.push(lib);
			} else {
				for (var ix = 0; ix < activeLibs.length; ix++) {
					if (activeLibs[ix].libraryID === event.currentTarget.value) {
						activeLibs.splice(ix, 1);
					}
				}
			}
			a7.model.set("activeLibraries", activeLibs);
			libraries.setState({ libraries: libraries.state.libraries, library: libraries.state.library, activeLibraries: activeLibs, offset: libraries.state.offset });
		},
		newLibrary: function (event) {
			if (libraries.isDirty()) {
				let dlg = utils.showDialog(" &nbsp; ", "Your changes will be discarded, proceed?",
					[{
						label: 'Yes', click: function () {
							dlg.close();
							a7.events.publish("library.new", {});
						}
					},
					{
						label: "No", click: function () {
							dlg.close();
						}
					}
					]);
			} else {
				a7.events.publish("library.new", {});
			}
		}
	};

	return libraries;
};
