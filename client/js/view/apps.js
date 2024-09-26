import { a7 } from '/lib/altseven/dist/a7.js';
import { auth } from '/js/app.auth.js';
import * as utils from '/js/app.utils.js';
import { Paging } from '/js/view/paging.js';
import { modal, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var Apps = function Apps(props) {
	var apps = a7.components.Constructor(a7.components.View, [props], true);

	apps.state = {
		visible: false
	};

	apps.components.modal = constructor(modal,
		[document.querySelector("#appsModal"),
		{ autoOpen: false, closeIcon: '/lib/feather-icons/dist/feather-sprite.svg#x-circle' }], true);

	apps.components.modal.on("closed", function (obj) {
		let user = a7.model.get("user");
		let app = a7.model.get("app");
		//history.back();
		a7.router.open( "/u/" + user.username + "/" + app.appID );
	});

	apps.isDirty = function () {
		let isDirty = false;
		let app = a7.model.get("app");
		let jsCode = a7.model.get('jsCode') || '';
		let htmlCode = a7.model.get('htmlCode') || '';
		let cssCode = a7.model.get('cssCode') || '';
		if ((app.appID === 0 && (jsCode.length > 0 || htmlCode.length > 0 || cssCode.length > 0))
			||
			(app.appID > 0 && (app.jsCode !== jsCode || app.htmlCode !== htmlCode || app.cssCode !== cssCode))
		) {
			isDirty = true;
		}
		return isDirty;
	};

	apps.template = function () {
		let author = a7.model.get("author");
		let user = a7.model.get("user");
		let appList = a7.model.get("appList");
		let app = a7.model.get("app");
		let disabled = (app.name.length > 0 ? '' : 'disabled="disabled"');

		let templ = ``;

		if (user.userID === author.userID) {
			templ += `<h2>Saved Applications</h2>
				<form>
                  <input type="text" name="name" placeholder="Application Name" value="${app.name}" data-oninput="checkSavable"/><br/>
                  <button name="save" type="button" data-onclick="saveApp" ${disabled}>Save</button>
                  <button type="button" data-onclick="newApp">New</button>
                  </form>`;
		}

		for (var ix = 0; ix < appList.length; ix++) {
			app = appList[ix];
			if (user.userID === author.userID) {
				templ += `<div class="flexrow listrow"><a data-id="${app.appID}" data-onClick="loadApp"/>${app.name}</a> <a name="trash" data-id="${app.appID}" data-onclick="deleteApp"><svg class="feather">
                  <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
                </svg></a></div>`;
			} else {
				templ += `<div class="flexrow"><a data-id="${app.appID}" data-onClick="loadApp"/>${app.name}</a></div>`;
			}
		}

		return templ;
	};

	apps.eventHandlers = {
		checkSavable: function (event) {
			if (event.currentTarget.value.trim().length > 0) {
				apps.element.querySelector("button[name='save']").removeAttribute("disabled");
			} else {
				apps.element.querySelector("button[name='save']").setAttribute('disabled', 'disabled');
			}
		},
		saveApp: function (event) {
			let app = a7.model.get("app");
			let appName = apps.element.querySelector("input[name='name']").value.trim();
			if (appName.length > 0) {
				if (app.appID === 0) {
					a7.events.publish("apps.create", {
						name: appName
					});
				}
				else {
					a7.events.publish("apps.update", {
						name: appName,
						appID: app.appID
					});
				}
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
		},
		loadApp: function (event) {
			let state = apps.getState();
			let user = a7.model.get("author");
			let target = event.currentTarget;
			if (apps.isDirty()) {
				let dlg = utils.showDialog(" &nbsp; ", "Your changes will be discarded, proceed?",
					[{
						label: 'Yes', click: function () {
							dlg.close();
							a7.router.open('/u/' + user.username + '/app/' + event.currentTarget.attributes['data-id'].value);
						}
					},
					{
						label: "No", click: function () {
							dlg.close();
						}
					}
					]);
			} else {
				a7.router.open('/u/' + user.username + '/app/' + event.currentTarget.attributes['data-id'].value);
			}
		},
		newApp: function (event) {
			let user = a7.model.get("user");
			if (apps.isDirty()) {
				let dlg = utils.showDialog(" &nbsp; ", "Your changes will be discarded, proceed?",
					[{
						label: 'Yes', click: function () {
							dlg.close();
							//a7.events.publish( "apps.new", {} );
							a7.router.open('/u/' + user.username + '/app');
						}
					},
					{
						label: "No", click: function () {
							dlg.close();
						}
					}
					]);
			} else {
				a7.router.open('/u/' + user.username + '/app');
			}
		}
	};

	return apps;
};
