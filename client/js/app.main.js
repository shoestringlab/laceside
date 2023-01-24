import {a7} from '/lib/altseven/dist/a7.js';
import {Console} from '/js/components/console.js';
import {Header} from '/js/components/header.js';
import {LoginForm} from '/js/components/loginform.js';
import {SignupForm} from '/js/components/signupform.js';
import {Menu} from '/js/components/menu.js';
import {Message} from '/js/components/message.js';
import {Libraries} from '/js/components/libraries.js';
import {Apps} from '/js/components/apps.js';
import {Profile} from '/js/components/profile.js';
import {ForgotPasswordForm} from '/js/components/forgotpasswordform.js';
import {ResetPasswordForm} from '/js/components/resetpasswordform.js';
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
      a7.ui.setSelector( 'message', "#message");

      let user = a7.model.get("user");

      // set the default appUser
      a7.model.set( "appUser", user );
      // render the initial views of the application
      // this is a good place to initialize views that should not be re-initialized
      Message( { id: 'message', selector: a7.ui.selectors['message'] } );
      LoginForm( { id: 'loginForm', selector: a7.ui.selectors['auth'] } );
      SignupForm( { id: 'signupForm', selector: a7.ui.selectors['signup'] } );
      Profile( { id: 'profile', selector: "#profile", user: user } );
      ForgotPasswordForm( { id: 'forgotPasswordForm', selector: "#forgotPassword" } );
      ResetPasswordForm( { id: 'resetPasswordForm', selector: "#resetPassword" } );

      let menuItems = [
        { label: 'Home', path: '/'}
      ];
      Menu( { id: 'menu', menuItems: menuItems, selector: "#headerLeft" } );

      UserHome( { id: 'userHome', selector: "#userHome", user: user, apps: [] } );
      Libraries( { id: 'libraries', selector: "#libraries", library: { libraryID: 0, name: "", link: "" } } );
      Apps( { id: 'apps', selector: "#apps" } );
      Tabs( { id: 'tabs', selector: "#editors" } );
      Console( { id: 'console', consoleText: '', selector: "#console" } );
      Home( { id: 'home', selector: "#home" } );
      Header( { id: 'header', user: user, selector: "#headerRight" } );
          //this.run( user );
      a7.router.match( document.location.pathname + document.location.search );
    }
  };
})();
