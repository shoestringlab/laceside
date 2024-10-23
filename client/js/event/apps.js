import { a7 } from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';
import { ui } from '/js/app.ui.js';
import { download } from '/js/app.download.js';

export var appEvents = function init() {

	a7.events.subscribe("apps.create", function (obj) {
		//let args = Object.assign({}, obj);
		let app = obj;
		
		app.jsCode = "";
		app.htmlCode = "";
		app.cssCode = "";
		app.esModule = 0;
		app.libraries = "";
		a7.remote.invoke("apps.create", app)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				var app = json;
				//app.esModule = app.esModule.data[0];
				var apps = a7.model.get("appList") || [];
				apps.set( app.appID, app );
				a7.model.set("appList", apps);
				a7.model.set("app", app);
				let state = a7.ui.getView('userApps').getBaseState();
				state.app = app;	
				a7.ui.getView('userApps').setState( state );
				utils.showNotice("The application was saved.", "#headerMiddle");
				// update the app list and library list 
				//a7.ui.getView('userApps').fireEvent("mustRender");
				a7.ui.getView('userLibs').fireEvent("mustRender");
			});
	});

	a7.events.subscribe("apps.update", function (obj) {

		a7.remote.invoke("apps.update", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				var app = json;
				//app.esModule = app.esModule.data[0];
				var apps = a7.model.get("appList");
				apps[app.appID] = app;

				a7.model.set("appList", apps);
				let mode = ui.getMode();

				utils.showNotice("The application was saved.", "#headerMiddle");

				if (mode === 'userhome') {
					a7.router.open("/");
				}else{
					// update the app list and library list 
					a7.ui.getView('userApps').fireEvent("mustRender");
					a7.ui.getView('userLibs').fireEvent("mustRender");
				}
			});
	});

	a7.events.subscribe("apps.load", function (obj) {
		let app  = a7.model.get("appList").get( obj.appID );
		app = app || { appID: 0, name: "", libraries: "", jsCode: "", htmlCode: "", cssCode: "" };
		
		a7.model.set("app", app);
		let JSEditor = a7.ui.getView('jseditor');
		let cssEditor = a7.ui.getView('csseditor');
		let HTMLEditor = a7.ui.getView('htmleditor');

		JSEditor.setEditorValue(app.jsCode);
		HTMLEditor.setEditorValue(app.htmlCode);
		cssEditor.setEditorValue(app.cssCode);

		let editorSize = a7.model.get("editorSize");
		let height = editorSize.height;
		let cmDivs = document.querySelectorAll(".CodeMirror");
		cmDivs.forEach(function (div) {
			div.setAttribute("style", "height:" + (height - 65) + "px !important");
		});

		a7.ui.getView('buttonbar').setState({ esModule: app.esModule });
		a7.events.publish("menu.update", { user: a7.model.get("author"), app: app });
		a7.events.publish("sandbox.execute", {});
	});

	a7.events.subscribe("apps.delete", function (obj) {
		a7.remote.invoke("apps.deleteById", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				if (json) {
					var apps = a7.model.get("appList");
					delete apps[obj.appID];
	
					a7.model.set("appList", apps);
				}
				
				// update userApps page 
				let state = a7.ui.getView("userApps").getState();
				state.app = { appID: 0 };
				a7.ui.getView( "userApps" ).setState( state );

 				// update top bar breadcrumb
				a7.events.publish("menu.update", { user: a7.model.get("user") });
				a7.events.publish("apps.new", {});
				utils.showNotice("The application was deleted.", "#headerMiddle");
				
				let currentApp = a7.model.get("app");

				// go to the user homepage if the deleted app was the open app
				if (currentApp.appID === obj.appID) {
					a7.model.set( "app", {appID: 0} );
					a7.router.open('/u/' + a7.model.get("user").username);
				}
				// update the app list and library list 
				a7.ui.getView('userApps').fireEvent("mustRender");
				a7.ui.getView('userLibs').fireEvent("mustRender");
			});
	});

	a7.events.subscribe("apps.new", function (obj) {
		if (a7.ui.getView('jseditor') !== undefined && a7.ui.getView('jseditor').components.editor) {
/* 			setEditorValue(a7.ui.getView('jseditor').components.editor, "");    //.viewState.state.update({changes: {from: 0, to: state.doc.length, insert: ""}});
			setEditorValue(a7.ui.getView('htmleditor').components.editor, "");
			setEditorValue(a7.ui.getView('csseditor').components.editor, ""); */
			let JSEditor = a7.ui.getView('jseditor');
			let cssEditor = a7.ui.getView('csseditor');
			let HTMLEditor = a7.ui.getView('htmleditor');
	
			JSEditor.setEditorValue("");
			HTMLEditor.setEditorValue("");
			cssEditor.setEditorValue("");
	
			a7.ui.getView('buttonbar').setState({ esModule: 0 });
		}

		a7.events.publish("sandbox.execute", {});
		a7.events.publish("menu.update", { user: a7.model.get("user") });
	});

	a7.events.subscribe("apps.download", function (obj) {
		download();
	});


};
