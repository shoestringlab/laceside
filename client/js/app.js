
import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';
import {events} from '/js/app.events.js';
import {appEvents} from '/js/events/apps.js';
import {authEvents} from '/js/events/auth.js';
import {libraryEvents} from '/js/events/libraries.js';
import {mainEvents} from '/js/events/main.js';
import {menuEvents} from '/js/events/menu.js';
import {profileEvents} from '/js/events/profile.js';
import {sandboxEvents} from '/js/events/sandbox.js';
import {userEvents} from '/js/events/user.js';
import {auth} from '/js/app.auth.js';
import {main} from '/js/app.main.js';
import {ui} from '/js/app.ui.js';
import * as libraries from '/js/remote/libraries.js';
import * as apps from '/js/remote/apps.js';
import * as profile from '/js/remote/profile.js';
import * as user from '/js/remote/user.js';
import {routes} from '/js/app.routes.js';

// you only need to import the floatingpane if you use it as the container for the console
//import {floatingpane} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

var app = {
  main: main,
  auth: auth,
  remote: {
    apps: apps,
    libraries: libraries,
    profile: profile,
    user: user
	},
  ui: ui,
	utils: utils
};

//initialize pub/sub events
events();
appEvents();
authEvents();
libraryEvents();
mainEvents();
menuEvents();
profileEvents();
sandboxEvents();
userEvents();


export var application = function init(){
	var
		options = {
		 	/* console: {
				enabled: true,
				container: floatingpane,
        //wsServer: 'ws://127.0.0.1:8000',
        left: 700
			}, */
			logging: {
				logLevel: "INFO,ERROR,FATAL,TRACE",
        toBrowserConsole: true
			},
			remote: {
				modules: app.remote,
			  loginURL: "/api/auth/login",
				logoutURL: "/api/auth/logout",
			  refreshURL: "/api/auth/refresh",
				useTokens: true // defaults to true for the auth system
			},
      router: {
        options: { useEvents: true },
        routes: routes
      }
		};
	var p = new Promise(function(resolve,
		reject) {
		a7.init(options, resolve, reject);
	});
	p.then(function(state) {
		app.main.init();
	});
	p['catch'](function(message) {
		console.log(
			"Something went wrong.");
	});
}
