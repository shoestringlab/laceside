import { a7 } from '/lib/altseven/dist/a7.js';
import { Paging } from '/js/view/paging.js';
import * as utils from '/js/app.utils.js';
import { dialog, menu, tabs, textinput, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var UserApps = function UserApps(props) {
	var userApps = a7.components.Constructor(a7.components.View, [props], true);

	const baseState = {
		offset: 0,
		showNewAppForm: props.showNewAppForm || false,
		app: {appID: 0},
		appName: "",
		editAppName: false,
		appNameIsDirty: false
	};

	userApps.getBaseState = function(){
		return Object.assign({}, baseState );
	}

	userApps.state = userApps.getBaseState();

	userApps.IsOKToCancel = function( type, val ){
		let state = userApps.getState();
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
					let state = userApps.getState();
					if( type === "app"){
						userApps.skipRender = false;
						state.showNewAppForm = false;
						state.editAppName = false;
						userApps.setState(state);
					}
					console.log( "closed dialog" );
				}
			});
		}else{
			userApps.skipRender = false;
			state.showNewAppForm = false;
			state.editAppName = false;
			userApps.setState(state);
		}
	};

	userApps.eventHandlers = {
		editAppDetails: function (event) {
			let user = a7.model.get("user");
			let state = userApps.getState();
			let id = event.currentTarget.getAttribute('data-id');
			let appList = a7.model.get( "appList" );
			let app = a7.model.get("appList").filter(application => application.appID === id)[0];
			state.app = app;
			userApps.skipRender = false;
			userApps.setState(state);
		},
		
		editAppName: function( event ){
			let state = userApps.getState();
			state.editAppName = true;
			userApps.setState(state);
		},

		editApp: function (event) {
			let user = a7.model.get("user");
			let state = userApps.getState();
			a7.router.open('/u/' + user.username + '/app/' + state.app.appID );
		},
		createApp: function (event) {
			let state = userApps.getBaseState();
			state.showNewAppForm = true;
			userApps.setState(state);
		},
		saveNewApp: function (event) {
			let obj = {};
			obj.name = userApps.element.querySelector('input[name="name"]').value;
			a7.events.publish("apps.create", obj);
/* 			let state = userApps.getBaseState();
			userApps.setState(state);
 */		},
		cancelNewApp: function (event) {
			let state = userApps.getState();
			state.showNewAppForm = false;
			userApps.setState(state);
		},
		saveApp: function (event) {
			userApps.skipRender = false;
			
			//editAppForm.querySelector("input[name='appName']").value;
			let state = userApps.getState();
			let app = state.app;
			app.name = state.appName;
			state.editAppName = false;
			userApps.setState(state);
			a7.events.publish("apps.update", app );
		},
		cancelEditAppDetails: function (event) {
			userApps.skipRender = true;
			let appName = editAppForm.querySelector("input[name='appName']").value;
			userApps.IsOKToCancel( "app", appName );
		},
		saveAppLibrary: function( event ){
			let state = userApps.getState();
			let libraryID = event.currentTarget.value;
			let checked = event.currentTarget.checked;
			if( checked ){
				a7.events.publish( "applibraries.create", { appID: state.app.appID, libraryID: libraryID });
			}else{
				a7.events.publish( "applibraries.delete", { appID: state.app.appID, libraryID: libraryID });
			}
			
		},
		deleteApp: function (event) {
			let appID = event.currentTarget.attributes['data-id'].value;
			let dlg = utils.showDialog(" &nbsp; ", "You are about to delete this app, proceed?",
				[{
					label: 'Yes', click: function () {
						dlg.close();
						a7.events.publish("apps.delete", {
							appID: appID
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

	userApps.on("rendered", function () {
		let appDetails = document.getElementById("userApps").querySelector("div[name='appDetails']");
		let state = userApps.getState();
		
		if( appDetails !== null){
			let leftCol = document.getElementById("userApps").querySelector("div[name='leftCol']");
			let bottom = leftCol.getBoundingClientRect().bottom;
			
			let top = appDetails.getBoundingClientRect().top;
			appDetails.style.height = (parseInt(bottom, 10) - parseInt(top, 10) ).toString() + "px";
		}

		if( state.editAppName ){
				
			// app name editing field
			let appForm = document.getElementById("editAppForm");
			if (appForm !== null) {
				const appNameInput = constructor(textinput, [
					appForm.querySelector("input[name='appName']"),
					{
						enforceMaxWidth: true,
						hideable: false
					}
				], true);

				appNameInput.selector.nextElementSibling.style.display='inline';

				//appNameInput.on( "mouseenter", function( obj ){
					
				//});

				appNameInput.on( "change", function( obj ){
					state.appNameIsDirty = ( obj.selector.value !== state.app.name );
					state.appName = obj.selector.value;
					userApps.skipRender = true;
					userApps.setState( state );
					userApps.skipRender = false;
				});
				
				appNameInput.on( "keyup", function( obj ){
					state.appNameIsDirty = ( obj.selector.value !== state.app.name );
					state.appName = obj.selector.value;
					userApps.skipRender = true;
					userApps.setState( state );
					userApps.skipRender = false;
				});
			}

		}

	});

	userApps.template = function () {
		let author = a7.model.get("author");
		let user = a7.model.get("user");
		let apps = a7.model.get("appList");
		let libs = a7.model.get("libraryList");
		let state = userApps.getState();


		let templ = `<div name="leftCol" class="col" style="padding: .5em 0 .5em .5em;">`;

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
				if (state.app.appID === app.appID) {
					//console.dir( app );
					templ += `<div class="block flexrow link" data-id="${app.appID}" name="currentApp">`;
					// app editing form
					templ += `	
							<div class="row">
								<div class="col w30">
								<h2>${state.app.name}</h2>
								</div>
							</div>

							`;
				} else {
					templ += `<div class="block flexrow link" data-id="${app.appID}" data-onClick="editAppDetails">`;
					//library name
					templ += `${app.name}`;
				}
				templ += `</div>`;
			}
		}

		templ += `</div>`;

		if( state.app.appID !== 0 ){

			templ +=`<div class="col" name="appDetails">


						<div class="row">
							<div class="col w30" style="display:flex; justify-content:space-between;">
							<button type="button" data-onclick="editApp">Open this app for editing</button>
							<div style="display:inline"> <a name="trash" data-id="${state.app.appID}" data-onclick="deleteApp">
							<svg class="feather_bigger">
							<use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
							</svg>
							</a></div>
							</div>
						</div>
						<div class="row">
							<div class="col w5"><h3>Name</h3></div>
							
						</div>
						<div class="row">
							<div class="col w30">
							<form id="editAppForm">`;

			if( state.editAppName ){
				templ+= `<input type="text" id="appName" name="appName" placeholder="App Name" value="${state.app.name}" class="w20">
						<div style="display:inline;" name="btns">
							<button type="button" data-onclick="saveApp">Save</button>
							<button type="button" data-onclick="cancelEditAppDetails">Cancel</button>
						</div>
				`;
			}else{
				templ +=`${state.app.name} <div name="editLink" style="display:inline;" data-onclick="editAppName"><a name="editName">[edit]</a></div>`;
			}					
	
			templ +=`</form>
							</div>
						</div>

						<div class="row">
							<div class="col w30">
								<h3 title="Check libraries that you want to use in the application. Associated libraries will be lazy loaded into the application automatically.">Associated Libraries</h3>
							</div>
						</div>
						<div class="row">
							<div class="col w30 scrollDiv" style="max-height:20em;">
							
						`;

						//templ +=`<div class="row">`;
						for( ix = 0; ix < libs.length; ix++ ){
							if( state.app.libraries.indexOf( libs[ix].libraryID ) >= 0 ){
								console.log(  libs[ix].libraryID + " included");
								templ+=`<div class="row"><input name="libraryID" data-onclick="saveAppLibrary" type="checkbox" value="${libs[ix].libraryID}" checked>`;
							}else{
								templ+=`<div class="row"><input name="libraryID" data-onclick="saveAppLibrary" type="checkbox" value="${libs[ix].libraryID}">`;
							}
							
							templ+=`${libs[ix].name}</div>`;
						}						
						
		}

		templ += `</div></div></div><div name="appPaging" class="paging"></div>`;

		//


		Paging({ id: 'userAppsPaging', parentID: userApps.props.id, selector: userApps.props.selector + ' div[name="appPaging"]', records: apps, offset: offset, pageSize: 10 });
		
		return templ;
	};
	
	return userApps;
};