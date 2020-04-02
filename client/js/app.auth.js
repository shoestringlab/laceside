import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';
import {main} from '/js/app.main.js';

export var auth = (function() {
  "use strict";

  var _authenticate = function() {
    var promise = new Promise(function(resolve, reject) {
      // check whether user is authenticated
      a7.security.isAuthenticated(resolve, reject);
    });

    promise.then(function(secure) {
      //reset apps and libraries
      a7.model.set( "apps", [] );
      a7.model.set( "libraries", [] );

      a7.ui.views['header'].setState( { user: a7.model.get( "user" ) } );
      //a7.ui.views['userHome'].setState( { user: a7.model.get( "user" ), apps: ( a7.model.get( "apps" ) || [] ) } );
      a7.ui.views['apps'].setState( { apps: [], app:{ appID: 0, name: "" } } );
      a7.ui.views['libraries'].setState( { libraries: [], library: { libraryID: 0, name: "", link: "" } } );
      a7.events.publish( "menu.update", { user: a7.model.get( "appUser" ) } );
      ui.setLayout( 'home' );
    });
  };

  var _logout;

  return {
    authenticate: _authenticate,
    loginHandler: function(json) {
      let user = a7.model.get( "user" );
      if( json.success ){

        a7.ui.views['header'].setState( { user: user } );
      }
      main.run( user );
    }
  };
})();
