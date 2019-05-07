import {a7} from '/lib/altseven/dist/a7.js';
import {Console} from '/js/components/console.js';
import {Header} from '/js/components/header.js';
import {LoginForm} from '/js/components/loginform.js';
import {Menu} from '/js/components/menu.js';
import {Libraries} from '/js/components/libraries.js';
import {Tabs} from '/js/components/tabs.js';
import {ButtonBar} from '/js/components/buttonbar.js';
import {ui} from '/js/app.ui.js';

export var main = (function() {
  "use strict";

  return {
    init: function(state) {
      // cache initial selectors
      a7.ui.setSelector( 'anonDiv', "#anon" );
      a7.ui.setSelector( 'secureDiv', "#secure");
      a7.ui.setSelector( 'sandBox', "#sandBox");
      this.run(state.secure);
    },

    run: function(secure) {
      // render the login form
      LoginForm( { id: 'loginForm', selector: a7.ui.selectors['anonDiv'] } );

      var user = a7.model.get("user");
      var menuItems = [
                        { label: 'JS Sandbox', action: 'menu.jsSandbox'}
                      ];

      Header( { id: 'header', user: user, selector: "#headerRight" } );
      Menu( { id: 'menu', menuItems: menuItems, selector: "#headerLeft" } );
      Libraries( { id: 'libraries', selector: "#libraries" } );
      Tabs( { id: 'tabs', selector: "#editors" } );
      ButtonBar( { id: 'buttonbar', selector: '#buttonBar' } );

      Console( { id: 'console', consoleText: '', selector: "div[name='console']" } );

      if( secure ){
        // initial actions after login
        a7.events.publish( "library.getLibraries", {offset: 0} );
      }
      ui.setLayout(secure);
    }
  };
})();
