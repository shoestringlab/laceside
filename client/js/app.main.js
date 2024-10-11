import { a7 } from '/lib/altseven/dist/a7.js';
import { Console } from '/js/view/console.js';
import { Header } from '/js/view/header.js';
import { LoginForm } from '/js/view/loginform.js';
import { SignupForm } from '/js/view/signupform.js';
import { Menu } from '/js/view/menu.js';
import { Message } from '/js/view/message.js';
import { Libraries } from '/js/view/libraries.js';
import { Apps } from '/js/view/apps.js';
import { Profile } from '/js/view/profile.js';
import { ForgotPasswordForm } from '/js/view/forgotpasswordform.js';
import { ResetPasswordForm } from '/js/view/resetpasswordform.js';
import { Tabs } from '/js/view/tabs.js';
import { Home } from '/js/view/home.js';
import { UserHome } from '/js/view/userhome.js';
import { auth } from '/js/app.auth.js';
import { ui } from '/js/app.ui.js';

export var main = (function () {
	"use strict";

	return {
		init: function () {
			// cache initial selectors
			a7.ui.setSelector('auth', "#auth");
			a7.ui.setSelector('authModal', "#authModal");
			a7.ui.setSelector('signup', "#signup");
			a7.ui.setSelector('signupModal', "#signupModal");
			a7.ui.setSelector('profileModal', "#profileModal");
			a7.ui.setSelector('appsModal', "#appsModal");
			a7.ui.setSelector('librariesModal', "#librariesModal");
			a7.ui.setSelector('secureDiv', "#secure");
			a7.ui.setSelector('app', "#app");
			a7.ui.setSelector('userHome', "#userHome");
			a7.ui.setSelector('home', "#home");
			a7.ui.setSelector('message', "#message");
			a7.ui.setSelector('editors', "#editors");
			a7.ui.setSelector('sidebar', "#sidebar");
			a7.ui.setSelector('htmlFrame', "#htmlFrame");

			auth.isAuthenticated(
				function( authenticated ){
					let user = a7.components.Constructor( a7.components.User, [{userID:""}], true );
					
					// the user is set into sessionStorage by the a7.remote.login function, so an authenticated user can be retrieved from sessionStorage
					if( authenticated ) user = JSON.parse(sessionStorage.user);

					// set the user into the model
					a7.model.set( "user", user );

					// set default author until we check the route
					//a7.model.set( "author", user );
					
					// default empty appList
					a7.model.set( "appList", [] );
					a7.model.set( "libraryList", [] );

					a7.model.set( "app", { appID: 0, name: "" } );
					// render the initial views of the application
					// this is a good place to initialize views that should not be re-initialized
					Message({ id: 'message', selector: a7.ui.selectors['message'] });
					LoginForm({ id: 'loginForm', selector: a7.ui.selectors['auth'] });
					SignupForm({ id: 'signupForm', selector: a7.ui.selectors['signup'] });
					ForgotPasswordForm({ id: 'forgotPasswordForm', selector: "#forgotPassword" });
					ResetPasswordForm({ id: 'resetPasswordForm', selector: "#resetPassword" });

					let menuItems = [
						{ label: 'Home', path: '/' }
					];
					Menu({ id: 'menu', menuItems: menuItems, selector: "#headerLeft" });

					Tabs({ id: 'tabs', selector: "#editors" });
					Console({ id: 'console', consoleText: '', selector: "#console" });
					Home({ id: 'home', selector: "#home" });
					Profile({ id: 'profile', selector: "#profile" });
					UserHome({ id: 'userHome', selector: "#userHome", apps: [] });
					Header({ id: 'header', selector: "#headerRight" });

					// match the route in the url 
					a7.router.match(document.location.pathname + document.location.search);
				}
			);
		}
	};
})();
