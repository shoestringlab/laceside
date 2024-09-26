import { a7 } from '/lib/altseven/dist/a7.js';
import { ui } from '/js/app.ui.js';
import * as utils from '/js/app.utils.js';
import { UserHome } from '/js/view/userhome.js';
import { Profile } from '/js/view/profile.js';

export var mainEvents = function init() {

	a7.events.subscribe("main.home", function (obj) {
		let user = a7.model.get("user");
		a7.model.set("author", user);
		// if there is a valid user (not anon), use userhome as the starting view
		// otherwise use home as the starting view
		let view = (user.userID.length > 0 ? 'userhome' : 'home');
		//reset the editor so no apps are cached in the background
		a7.events.publish("apps.new", {});
		// run the main
		a7.events.publish("main.run", { view: view });
	});

	a7.events.subscribe("main.run", function (obj) {

		if( obj.view === "userhome"){
			UserHome({ id: 'userHome', selector: "#userHome" });
		/* }else{
			Home({ id: 'home', selector: "#home"}); */
		}
		// set the layout
		//ui.setLayout( obj.view );
		a7.events.publish("main.refreshHeader", {});
		//Header( { id: 'header', user: a7.model.get( "user" ), selector: "#headerRight" } );
		// default author to the current user, which may be the anon user
		//obj.author = obj.author || user;

		if (a7.model.get("author").userID.length > 0) {
			obj.offset = 0;
			obj.user = a7.model.get("author");

			// initial actions after login
			a7.events.publish("user.getUserLibraries", obj);
			a7.events.publish("user.getUserApps", obj);
		}
		a7.events.publish("menu.update", { user: a7.model.get("author") });
		ui.setLayout(obj.view);
	});

	a7.events.subscribe("main.showMessage", function (obj) {
		let mState = a7.ui.getView("message").getState();
		mState.message = obj.message;
		a7.ui.getView("message").setState(mState);
		a7.ui.getView("message").components.modal.open();
	});

	a7.events.subscribe("main.refreshHeader", function (obj) {
		let header = a7.ui.getView("header");
		let state = header.getState();
		state.user = a7.model.get("user");
		header.setState(state);
	});
};
