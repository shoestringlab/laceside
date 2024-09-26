import { a7 } from '/lib/altseven/dist/a7.js';
import { Paging } from '/js/view/paging.js';
import { menu, tabs, textinput, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var UserHome = function UserHome(props) {
	var userHome = a7.components.Constructor(a7.components.View, [props], true);

	userHome.state = {
		offset: 0,
		libOffset: 0,
		showNewAppForm: props.showNewAppForm || false,
		showNewLibForm: props.showNewLibForm || false,
		libraryID: 0,
		appID: 0,
		activeTab: 'userApps'
	};

	userHome.eventHandlers = {
		editAppName: function (event) {
			let user = a7.model.get("user");
			let state = userHome.getState();
			let id = event.currentTarget.getAttribute('data-id');
			state.appID = id;
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
			let state = userHome.getState();
			let editAppForm = document.getElementById("editAppForm");
			let name = editAppForm.querySelector("input[name='appName']").value;
			a7.events.publish("apps.update", { name: name, appID: state.appID });
		},
		cancelApp: function (event) {
			let state = userHome.getState();
			state.showNewAppForm = false;
			state.appID = 0;
			userHome.setState(state);
		},
		createLibrary: function (event) {
			let state = userHome.getState();
			state.showNewLibForm = true;
			state.libraryID = 0;
			state.appID = 0;
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
					emitEvents: true,
					enforceMaxWidth: true,
					hideable: true
				}
			]);

			constructor(textinput, [
				libForm.querySelector("input[name='link']"),
				{
					emitEvents: true,
					enforceMaxWidth: true,
					hideable: true
				}
			]);
		}

		let appForm = document.getElementById("editAppForm");
		if (appForm !== null) {
			constructor(textinput, [
				appForm.querySelector("input[name='appName']"),
				{
					emitEvents: true,
					enforceMaxWidth: true,
					hideable: true
				}
			]);

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
				templ += `<form><div class="block flexrow link"><input name="name" placeholder="Application Name" type="text" class="w30">
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
			for (var ix = offset; ix < Math.min(apps.length, state.offset + 20); ix++) {
				let app = apps[ix];
				if (state.appID === app.appID) {
					templ += `<div class="bigBlock flexrow link" data-id="${app.appID}">`;
					// app editing form
					templ += `	<form id="editAppForm">
									<div class="row">
										<div class="col w40">
										<button type="button" data-onclick="editApp">Open this app for editing</button>
										</div>
									</div>
									<div class="row">
										<div class="col w40">
											<!--<label for="appName">Name</label>-->
											<input type="text" id="appName" name="appName" placeholder="App Name" value="${app.name}" class="w20">
											<div style="display:none;" name="btns">
												<button type="button" data-onclick="saveApp">Save</button>
												<button type="button" data-onclick="cancelApp">Cancel</button>
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

		templ += `</div><div class="paging"></div></div>
            
            `;
		if (apps.length) {
			Paging({ id: 'userHomeAppsPaging', parentID: userHome.props.id, selector: userHome.props.selector + ' div.paging', records: apps, offset: offset, pageSize: 20 });
		}

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
			for (var ix = libOffset; ix < Math.min(libs.length, state.libOffset + 20); ix++) {
				let lib = libs[ix];

				if (state.libraryID === lib.libraryID) {
					templ += `<div class="bigBlock flexrow link" data-id="${lib.libraryID}">`;
					// library editing form
					templ += `	<form id="editLibForm">
								<div class="row">
									<div class="col w5"><label for="libName">Name</label></div>
								</div>
								<div class="row">	
									<div class="col w40"><input type="text" id="libName" name="name" placeholder="Library Name" value="${lib.name}" class="w35"></div>
								</div>
								<div class="row">
									<div class="col w5"><label for="libLink">Link</label></div>
								</div>
								<div class="row">	
									<div class="col w40"><input type="text" id="libLink" name="link" placeholder="Library Location" value="${lib.link}" class="w35"></div>
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

		templ += `</div><div class="paging"></div></div>
            
            `;
		if (libs.length) {
			Paging({ id: 'userHomeLibsPaging', parentID: userHome.props.id, selector: userHome.props.selector + ' div.paging', records: libs, offset: libOffset, pageSize: 20 });
		}

		return templ;
	};
	return userHome;
};
