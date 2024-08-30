import { a7 } from '/lib/altseven/dist/a7.js';

export var menuEvents = function init() {

	a7.events.subscribe("menu.update", function (obj) {
		let menuItems = [
			{ label: 'Home', path: '/' }
		];
		if (obj.user.userID) {
			menuItems.push({ label: obj.user.username, path: '/u/' + obj.user.username });
		}
		if (obj.app) {
			menuItems.push({ label: obj.app.name, path: '/u/' + obj.user.username + '/' + obj.app.appID });
		}
		let state = a7.ui.getView('menu').getState();
		state.menuItems = menuItems;
		a7.ui.getView('menu').setState(state);
	});
};
