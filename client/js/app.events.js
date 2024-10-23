import { a7 } from '/lib/altseven/dist/a7.js';
import { ui } from '/js/app.ui.js';
import { main } from '/js/app.main.js';
import * as utils from '/js/app.utils.js';

export var events = function init() {
	//  this event is called when /u/:username/:appID is called by the router
	a7.events.subscribe("ide.show", function (obj) {
		ui.setLayout("ide");
		if( a7.model.get("user").username === obj.username ){
			let user = a7.model.get("user");
			a7.model.set("author", user);
			obj.user = user;
			if (a7.model.get("appList").size === 0) {
				a7.events.publish("main.run", obj);
			}
			a7.events.publish("apps.load", obj);
		}else{
			a7.remote.invoke("user.getUserByUsername", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (user) {
				a7.model.set("author", user);
				obj.user = user;
				if (a7.model.get("appList").size === 0) {
					a7.events.publish("main.run", obj);
				}
				a7.events.publish("apps.load", obj);
			});
		}
	});

	a7.events.subscribe("application.matchRoute", function( obj ){
		// match the route in  obj
		a7.router.match(obj.route);
	});
}
