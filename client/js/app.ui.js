import {a7} from '/lib/altseven/dist/a7.js';

export var ui = (function() {
  "use strict";

  return {
    //	templates: _templates,
    setLayout: function( mode ){
      let secure = ( a7.model.get( "user" ).userID > 0 );

      // remove any open modals
      a7.ui.getNode( a7.ui.getSelector("authModal") ).parentElement.classList.remove( 'gadgetui-showModal' );
      a7.ui.getNode( a7.ui.getSelector("profileModal") ).parentElement.classList.remove( 'gadgetui-showModal' );

      switch( mode ){
        case "ide":
          //a7.ui.getNode( a7.ui.selectors['sandBox'] ).style.display='grid';
          a7.ui.getNode( a7.ui.selectors["ide"] ).classList.remove( "hidden" );
          a7.ui.getNode( a7.ui.getSelector("base") ).classList.add( "hidden" );

          break;
        case "auth":
          a7.ui.getNode( a7.ui.getSelector("authModal") ).parentElement.classList.add( 'gadgetui-showModal' );
          break;
        case "home":
        default:
          a7.ui.getNode( a7.ui.selectors["ide"] ).classList.add( "hidden" );
          a7.ui.getNode( a7.ui.getSelector("base") ).classList.remove( "hidden" );
          let homeSelector = ( secure ? "userHome" : "home" );
          let hiddenSelector = ( secure ? "home" : "userHome" );
          a7.ui.getNode( a7.ui.getSelector(homeSelector) ).classList.remove( "hidden" );
          a7.ui.getNode( a7.ui.getSelector(hiddenSelector) ).classList.add( "hidden" );
          break;
      }
    }
  };
})();
