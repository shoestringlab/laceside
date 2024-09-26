import { a7 } from '/lib/altseven/dist/a7.js';
import { menu, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var Header = function Header(props) {
	var header = a7.components.Constructor(a7.components.View, [props], true);

	header.state = {
	};

	header.eventHandlers = {
		logout: function () {
			a7.events.publish('auth.logout', {
				success: "/auth/logoutsuccess",
				failure: "/auth/logoutfailure"
			});
		},
		showProfile: function () {
			//a7.events.publish( 'profile.show' );
			let user = a7.model.get("user");
			a7.router.open('/u/' + user.username + '/profile', { userID: user.userID });
		},
		showApps: function () {
			//a7.events.publish( 'profile.show' );
			let user = a7.model.get("user");
			a7.router.open('/u/' + user.username + '/apps', { userID: user.userID });
		},
		signIn: function (event) {
			a7.events.publish('auth.showLogin', {});
		},
		createAccount: function (event) {
			a7.events.publish('auth.showSignup', {});
		}
	};

	header.on("rendered", function () {
		let user = a7.model.get( "user" );
		let profilePic = user.profilePic || '/img/profilepics/anon.png';
		let items = [];
		if (user.userID) {
			items = [
				{
					label: "Profile",
					link: header.eventHandlers.showProfile
				},
				{
					label: "Apps",
					link: header.eventHandlers.showApps
				},
				{
					label: "Sign out",
					link: header.eventHandlers.logout
				}
			];
		} else {
			items = [
				{
					label: "Create Account",
					link: header.eventHandlers.createAccount
				},
				{
					label: "Sign In",
					link: header.eventHandlers.signIn
				}
			];
		}

		let menuData = [
			{
				image: profilePic,
				menuItem: {
					items: items
				}
			}
		];

		header.components.menu = constructor(menu, [document.querySelector("#profileMenu"), { data: menuData }]);
	});

	header.template = function () {
	
		let str = `<div class="profileHeader" id="profileMenu"></div>`;
		return str;
	};
	return header;
};
