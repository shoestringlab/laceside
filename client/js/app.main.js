import {a7} from '/lib/altseven/dist/a7.js';
import {Console} from '/js/components/console.js';
import {Header} from '/js/components/header.js';
import {LoginForm} from '/js/components/loginform.js';
import {SignupForm} from '/js/components/signupform.js';
import {Menu} from '/js/components/menu.js';
import {Libraries} from '/js/components/libraries.js';
import {Apps} from '/js/components/apps.js';
import {Profile} from '/js/components/profile.js';
import {Tabs} from '/js/components/tabs.js';
import {Home} from '/js/components/home.js';
import {UserHome} from '/js/components/userhome.js';
import {ui} from '/js/app.ui.js';

export var main = (function() {
  "use strict";

  return {
    init: function() {
      // cache initial selectors
      a7.ui.setSelector( 'auth', "#auth" );
      a7.ui.setSelector( 'authModal', "#authModal" );
      a7.ui.setSelector( 'signup', "#signup" );
      a7.ui.setSelector( 'signupModal', "#signupModal" );
      a7.ui.setSelector( 'profileModal', "#profileModal" );
      a7.ui.setSelector( 'secureDiv', "#secure");
      a7.ui.setSelector( 'sandBox', "#sandBox");
      a7.ui.setSelector( 'ide', "#ide");
      a7.ui.setSelector( 'base', "#base");
      a7.ui.setSelector( 'userHome', "#userHome");
      a7.ui.setSelector( 'home', "#home");

      let user = a7.model.get("user");

      // set the default appUser
      a7.model.set( "appUser", user );
      // render the initial views of the application
      LoginForm( { id: 'loginForm', selector: a7.ui.selectors['auth'] } );
      SignupForm( { id: 'signupForm', selector: a7.ui.selectors['signup'] } );
      let menuItems = [
        { label: 'Home', path: '/'}
      ];
      Menu( { id: 'menu', menuItems: menuItems, selector: "#headerLeft" } );

      UserHome( { id: 'userHome', selector: "#userHome", user: user, apps: [] } );
      Libraries( { id: 'libraries', selector: "#libraries", library: { libraryID: 0, name: "", link: "" } } );
      Apps( { id: 'apps', selector: "#apps" } );
      Tabs( { id: 'tabs', selector: "#editors" } );
      Console( { id: 'console', consoleText: '', selector: "div[name='console']" } );
      Home( { id: 'home', selector: "#home" } );

          //this.run( user );
      a7.router.match( document.location.pathname + document.location.search );
    }
  };
})();
