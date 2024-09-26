import { a7 } from '/lib/altseven/dist/a7.js';
import { Paging } from '/js/view/paging.js';
import * as utils from '/js/app.utils.js';
import { dialog, menu, tabs, textinput, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var UserHome = function UserHome(props) {
	var userHome = a7.components.Constructor(a7.components.View, [props], true);

	userHome.state = {
		offset: 0,
		libOffset: 0,
		showNewAppForm: props.showNewAppForm || false,
		showNewLibForm: props.showNewLibForm || false,
		libraryID: 0,
		appID: 0,
		appName: "",
		activeTab: 'userApps',
		appNameIsDirty: false,
		libNameIsDirty: false
	};

	userHome.IsOKToCancel = function( type, val ){
		let state = userHome.getState();
		let result = false;
		if( state[ type + "NameIsDirty" ] ){
	
			let fp1 = constructor( dialog,
				[ null,
					{
						top: 200,
						left: 200,
						width: '400px',
						zIndex:2,
						title : "Confirm",
						message: "Abandon Changes?",
						path : "/lib/gadget-ui/dist/",
						enableShrink : false,
						overflow: "hidden",
						buttons: [
							{ label: 'Yes', click: function(){ 
								result = true;
								fp1.close();
							}},
							{ label: 'No', click: function(){ 
								fp1.close();
							}}
						]
					}], true );
	
			fp1.on( "closed", function( obj ){
				if( result ){
					let state = userHome.getState();
					if( type === "app"){
						userHome.skipRender = false;
						state.showNewAppForm = false;
						state.appID = 0;
						state.app = {};
						userHome.setState(state);
					}
					console.log( "closed dialog" );
				}
			});
		}else{
			userHome.skipRender = false;
			state.showNewAppForm = false;
			state.appID = 0;
			state.appName = "";
			state.app = {};
			userHome.setState(state);
		}
	};

	userHome.eventHandlers = {
		editAppName: function (event) {
			let user = a7.model.get("user");
			let state = userHome.getState();
			let id = event.currentTarget.getAttribute('data-id');
			let appList = a7.model.get( "appList" );
			let app = a7.model.get("appList").filter(application => application.appID === id)[0];
			state.appID = id;
			state.app = app;
			state.activeTab = 'userApps';
			userHome.setState(state);
		},
		editApp: function (event) {
			let user = a7.model.get("user");
			let state = userHome.getState();
			a7.router.open('/u/' + user.username + '/app/' + state.appID );
		},
		createApp: function (event) {
			let state = userHome.getState();
			state.showNewAppForm = true;
			state.libraryID = 0;
			state.appID = 0;
			state.app = {};
			state.activeTab = 'userApps';
			userHome.setState(state);
		},
		saveNewApp: function (event) {
			let obj = {};
			obj.name = userHome.element.querySelector('input[name="name"]').value;
			let state = userHome.getState();
			state.activeTab = 'userApps';
			userHome.setState(state);
			a7.events.publish("apps.create", obj);
		},
		cancelNewApp: function (event) {
			let state = userHome.getState();
			state.showNewAppForm = false;
			state.activeTab = 'userApps';
			userHome.setState(state);
		},
		saveApp: function (event) {
			userHome.skipRender = false;
			
			//editAppForm.querySelector("input[name='appName']").value;
			let state = userHome.getState();
			let appName = state.appName;
			a7.events.publish("apps.update", { name: appName, appID: state.appID });
		},
		cancelEditAppName: function (event) {
			userHome.skipRender = true;
			let appName = editAppForm.querySelector("input[name='appName']").value;
			userHome.IsOKToCancel( "app", appName );
		},
		createLibrary: function (event) {
			let state = userHome.getState();
			state.showNewLibForm = true;
			state.libraryID = 0;
			state.appID = 0;
			state.app = {};
			state.activeTab = 'userLibs';
			userHome.setState(state);
		},		
		editLibrary: function (event) {
			let user = a7.model.get("user");
			let state = userHome.getState();
			let id = event.currentTarget.getAttribute('data-id');
			state.libraryID = id;
			state.activeTab = 'userLibs';
			userHome.setState(state);
		},
		cancelNewLib: function (event) {
			let state = userHome.getState();
			state.showNewLibForm = false;
			state.libraryID = 0;
			state.activeTab = 'userLibs';
			userHome.setState(state);
		}
	};

	userHome.on("rendered", function () {
		let state = userHome.getState();
		userHome.components.tabs = constructor(tabs, [userHome.element.querySelector("#userTabs"), {}], true);
		userHome.components.tabs.setActiveTab(state.activeTab);
		userHome.components.tabs.on("tabSelected", function (obj, activeTab) {
			console.log(activeTab);
			//a7.ui.getView( activeTab.toLowerCase() ).components.editor.refresh();
		});

		let libForm = document.getElementById("editLibForm");
		if (libForm !== null) {
			constructor(textinput, [
				libForm.querySelector("input[name='name']"),
				{
					enforceMaxWidth: true,
					hideable: true
				}
			], true);

			constructor(textinput, [
				libForm.querySelector("input[name='link']"),
				{
					enforceMaxWidth: true,
					hideable: true
				}
			], true);
		}

		let appForm = document.getElementById("editAppForm");
		if (appForm !== null) {
			const appNameInput = constructor(textinput, [
				appForm.querySelector("input[name='appName']"),
				{
					enforceMaxWidth: true,
					hideable: true
				}
			], true);

			appNameInput.on( "mouseenter", function( obj ){
				obj.selector.nextElementSibling.style.display='inline';
			});

			appNameInput.on( "change", function( obj ){
				let state = userHome.getState();
				state.appNameIsDirty = ( obj.selector.value !== state.app.name );
				state.appName = obj.selector.value;
				userHome.skipRender = true;
				userHome.setState( state );
				userHome.skipRender = false;
			});
			
			appNameInput.on( "keyup", function( obj ){
				let state = userHome.getState();
				state.appNameIsDirty = ( obj.selector.value !== state.app.name );
				state.appName = obj.selector.value;
				userHome.skipRender = true;
				userHome.setState( state );
				userHome.skipRender = false;
			});
		}

		let apps = a7.model.get("appList");
		let libs = a7.model.get("libraryList");
		let offset = parseInt(state.offset, 10);
		let libOffset = parseInt(state.libOffset, 10);
 
		if (apps.length) {
			Paging({ id: 'userHomeAppsPaging', parentID: userHome.props.id, selector: userHome.props.selector + ' div.paging', records: apps, offset: offset, pageSize: 10 });
		}
		
		if (libs.length) {
			Paging({ id: 'userHomeLibsPaging', parentID: userHome.props.id, selector: userHome.props.selector + ' div.paging', records: libs, offset: libOffset, pageSize: 10 });
		}
	});

	userHome.template = function () {
		let author = a7.model.get("author");
		let user = a7.model.get("user");
		let apps = a7.model.get("appList");

		let state = userHome.getState();
		let templ = `<div class="tabs">
                <div style="display:inline;" id="userTabs">
                    <div name="userApps" data-tab="userApps">Applications</div>
                    <div name="userLibs" data-tab="userLibs">Libraries</div>
                </div>
                </div>
		
			<div id="userApps" class="panel"><div class="col">`;

		if (user.userID === author.userID) {
			if (state.showNewAppForm) {
				templ += `<form><div class="block flexrow link"><input name="name" placeholder="Application Name" type="text" class="w20">
				<div style="display:inline;">
					<button type="button" data-onclick="saveNewApp">Save</button>
					<button type="button" data-onclick="cancelNewApp">Cancel</button>
				</div> 
				</div></form>`;
			} else {
				templ += `<div class="block flexrow link" data-onClick="createApp">[Create a New Application]</div>`;
			}
		}
		
		let offset = parseInt(state.offset, 10);

		if (apps.length) {
			for (var ix = offset; ix < Math.min(apps.length, state.offset + 10); ix++) {
				let app = apps[ix];
				if (state.appID === app.appID) {
					templ += `<div class="block flexrow link" data-id="${app.appID}">`;
					// app editing form
					templ += `	<form id="editAppForm">
									<div class="row">
										<div class="col w30">
										<button type="button" data-onclick="editApp">Open this app for editing</button>
										</div>
									</div>
									<div class="row">
										<div class="col w30">
						
											<input type="text" id="appName" name="appName" placeholder="App Name" value="${app.name}" class="w20">
											<div style="display:none;" name="btns">
												<button type="button" data-onclick="saveApp">Save</button>
												<button type="button" data-onclick="cancelEditAppName">Cancel</button>
											</div> 
										</div>
									</div>
								</form>
								</div>`;
				} else {
					templ += `<div class="block flexrow link" data-id="${app.appID}" data-onClick="editAppName">`;
					//library name
					templ += `${app.name}`;
				}
				templ += `</div>`;
			}
		}

		templ += `</div><div class="paging"></div></div>`;

		
		// libraries
		let libs = a7.model.get("libraryList");
		templ += `<div id="userLibs" class="panel"><div class="col">`;

		if (user.userID === author.userID) {
			if (state.showNewLibForm) {
				templ += `<form><div class="block flexrow link"><input class="w30" name="name" placeholder="Library Name">
					<div style="display:inline;">
					<button type="button" data-onclick="saveNewLib">Save</button>
					<button type="button" data-onclick="cancelNewLib">Cancel</button>
					</div>
					</div></form>`;
			} else {
				templ += `<div class="block flexrow link" data-onClick="createLibrary">[Link a Library]</div>`;
			}
		}

		let libOffset = parseInt(state.libOffset, 10);

		if (libs.length) {
			for (var ix = libOffset; ix < Math.min(libs.length, state.libOffset + 10); ix++) {
				let lib = libs[ix];

				if (state.libraryID === lib.libraryID) {
					templ += `<div class="block flexrow link" data-id="${lib.libraryID}">`;
					// library editing form
					templ += `	<form id="editLibForm">
								<div class="row">
									<div class="col w5"><label for="libName">Name</label></div>
								</div>
								<div class="row">	
									<div class="col w30"><input type="text" id="libName" name="name" placeholder="Library Name" value="${lib.name}" class="w20"></div>
								</div>
								<div class="row">
									<div class="col w5"><label for="libLink">Link</label></div>
								</div>
								<div class="row">	
									<div class="col w30"><input type="text" id="libLink" name="link" placeholder="Library Location" value="${lib.link}" class="w20"></div>
								</div>
								</form>`;
				} else {
					templ += `<div class="block flexrow link" data-id="${lib.libraryID}" data-onClick="editLibrary">`;
					//library name
					templ += `${lib.name}`;
				}
				templ += `</div>`;

				if (ix - libOffset === 9 && libs.length > 10) {
					templ += `</div><div class="col">`;
				}
			}
		}

		templ += `</div><div class="paging"></div></div>`;

		return templ;
	};
	return userHome;
};
