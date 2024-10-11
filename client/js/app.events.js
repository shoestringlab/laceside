import { a7 } from '/lib/altseven/dist/a7.js';
import { ui } from '/js/app.ui.js';
import { main } from '/js/app.main.js';
import * as utils from '/js/app.utils.js';

export var events = function init() {
	//  this event is called when /u/:username/:appID is called by the router
	a7.events.subscribe("ide.show", function (obj) {
		ui.setLayout("ide");

		a7.remote.invoke("user.getUserByUsername", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (user) {
				a7.model.set("author", user);
				obj.user = user;
				if (a7.model.get("appList") === undefined) {
					a7.events.publish("main.run", obj);
				} else {
					a7.events.publish("apps.load", obj);
				}
			});
	});
}
