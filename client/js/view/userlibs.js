import { a7 } from '/lib/altseven/dist/a7.js';
import { Paging } from '/js/view/paging.js';
import * as utils from '/js/app.utils.js';
import { dialog, textinput, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var UserLibs = function UserLibs(props) {
	var userLibs = a7.components.Constructor(a7.components.View, [props], true);

	const baseState = {
		libOffset: 0,
		showNewLibForm: props.showNewLibForm || false,
		library: {},
		libraryID: 0,
		libName: "",
		libLink: "",
		libNameIsDirty: false
	};


	userLibs.getBaseState = function(){
		return Object.assign({}, baseState );
	}

	userLibs.state = userLibs.getBaseState();

	userLibs.eventHandlers = {
		
		createLibrary: function (event) {
			let state = userLibs.getState();
			state.showNewLibForm = true;
			state.libraryID = 0;

			//state.activeTab = 'userLibs';
			userLibs.setState(state);
		},		
		editLibrary: function (event) {
			let user = a7.model.get("user");
			let state = userLibs.getState();
			let id = event.currentTarget.getAttribute('data-id');
			state.libraryID = id;
			let libraryList = a7.model.get("libraryList");
			//let library = a7.model.get("libraryList").filter(library => library.libraryID === id)[0];
			let library = libraryList.get(id);
			
			//a7.model.get("libraryList")[id];
			state.libName = library.name;
			state.libLink = library.link;
			state.library = library;
			//state.activeTab = 'userLibs';
			userLibs.setState(state);
		},
		saveLib: function (event) {
			userLibs.skipRender = false;
			
			//editAppForm.querySelector("input[name='appName']").value;
			let state = userLibs.getState();
		
			//state.activeTab = 'userLibs';
			a7.events.publish("library.update", { name: state.libName, link: state.libLink, libraryID: state.libraryID });
		},
		cancelEditLib: function ( event ){
			let newState = userLibs.getBaseState();
			newState.activeTab = 'userLibs';
			userLibs.setState( newState );
		},
		saveNewLib: function (event) {
			let obj = {};
			obj.name = userLibs.element.querySelector('input[name="name"]').value;
			obj.link = userLibs.element.querySelector('input[name="link"]').value;
			let state = userLibs.getState();
			state.activeTab = 'userLibs';
			state.showNewLibForm = false;
			userLibs.setState(state);
			a7.events.publish("library.create", obj);
		},
		cancelNewLib: function (event) {
			let state = userLibs.getState();
			state.showNewLibForm = false;
			state.libraryID = 0;
			//state.activeTab = 'userLibs';
			userLibs.setState(state);
		},
		deleteLibrary: function (event) {
			let tgt = event.currentTarget;
			let dlg = utils.showDialog(" &nbsp; ", "You are about to delete this library, proceed?",
				[{
					label: 'Yes', click: function () {
						dlg.close();
						a7.events.publish("library.delete", {
							libraryID: tgt.attributes['data-id'].value
						});
					}
				},
				{
					label: "No", click: function () {
						dlg.close();
					}
				}
				]);
		}
	};

	userLibs.on("rendered", function () {
		let state = userLibs.getState();

		let libForm = document.getElementById("editLibForm");
		if (libForm !== null) {
			let libNameInput = constructor(textinput, [
				libForm.querySelector("input[name='name']"),
				{
					enforceMaxWidth: true,
					hideable: true
				}
			], true);

			libNameInput.on( "change", function( obj ){
				state.libNameIsDirty = ( obj.selector.value !== state.library.name );
				state.libName = obj.selector.value;
				userLibs.skipRender = true;
				userLibs.setState( state );
				userLibs.skipRender = false;
			});
			
			libNameInput.on( "keyup", function( obj ){
				state.libNameIsDirty = ( obj.selector.value !== state.library.name );
				state.libName = obj.selector.value;
				userLibs.skipRender = true;
				userLibs.setState( state );
				userLibs.skipRender = false;
			});

			let libLinkInput = constructor(textinput, [
				libForm.querySelector("input[name='link']"),
				{
					enforceMaxWidth: true,
					hideable: true
				}
			], true);

			libLinkInput.on( "change", function( obj ){
				state.libLinkIsDirty = ( obj.selector.value !== state.library.link );
				state.libLink = obj.selector.value;
				userLibs.skipRender = true;
				userLibs.setState( state );
				userLibs.skipRender = false;
			});
			
			libLinkInput.on( "keyup", function( obj ){
				state.libLinkIsDirty = ( obj.selector.value !== state.library.link );
				state.libLink = obj.selector.value;
				userLibs.skipRender = true;
				userLibs.setState( state );
				userLibs.skipRender = false;
			});
		}

		let libs = a7.model.get("libraryList");
		let libOffset = parseInt(state.libOffset, 10);
	});

	userLibs.template = function () {
		let author = a7.model.get("author");
		let user = a7.model.get("user");
		let libs = a7.model.get("libraryList");
		let state = userLibs.getState();


		// libraries
	
		let templ = `<div class="col">`;

		if (user.userID === author.userID) {
			if (state.showNewLibForm) {
				templ += `<form>
							<div class="block link">
							<div>
							<input class="w30" name="name" placeholder="Library Name"><br>
							<input class="w30" name="link" placeholder="Library Link">
							</div>
							
							<div>
								<button type="button" data-onclick="saveNewLib">Save</button>
								<button type="button" data-onclick="cancelNewLib">Cancel</button>
								
							</div>
							</div>
							</form>`;
			} else {
				templ += `<div class="block flexrow link" data-onClick="createLibrary">[Link a Library]</div>`;
			}
		}

		let libOffset = parseInt(state.libOffset, 10);
		
		let ix = 0;
		libs.forEach( lib => {
			if( ix >= libOffset  && ix <Math.min(libs.size, libOffset + 10)){
				if (state.libraryID === lib.libraryID) {
					templ += `<div class="block flexrow link" data-id="${lib.libraryID}">`;
					// library editing form
					templ += `	<form id="editLibForm">
								<div class="row" style="display:flex; justify-content:space-between;">
									<div class="col w5"><label for="libName">Name</label></div>
									<div style="display:inline"> <a name="trash" data-id="${lib.libraryID}" data-onclick="deleteLibrary">
									<svg class="feather_bigger">
									<use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
									</svg>
									</a></div>
								</div>
								<div class="row">	
									<div class="col w30"><input type="text" id="libName" name="name" placeholder="Library Name" value="${lib.name}" class="w30"></div>
								</div>
								<div class="row">
									<div class="col w5"><label for="libLink">Link</label></div>
								</div>
								<div class="row">	
									<div class="col w30"><input type="text" id="libLink" name="link" placeholder="Library Location" value="${lib.link}" class="w30"></div>
								</div>
								<div>
									<button type="button" data-onclick="saveLib">Save</button>
									<button type="button" data-onclick="cancelEditLib">Cancel</button>
									
								</div>
								</form>`;
				} else {
					templ += `<div class="block flexrow link" data-id="${lib.libraryID}" data-onClick="editLibrary">`;
					//library name
					templ += `${lib.name}`;
				}
				templ += `</div>`;
				if (ix - libOffset === 9 && libs.size > 10) {
					templ += `</div><div class="col">`;
				}
			}

			ix++;
		});
				
		/* 	}
		}
 */
		templ += `</div><div name="libPaging" class="paging"></div>`;

		Paging({ id: 'userLibsPaging', parentID: userLibs.props.id, selector: userLibs.props.selector + ' div[name="libPaging"]', records: libs, offset: libOffset, pageSize: 10 });

		return templ;
	};
	
	return userLibs;
};
