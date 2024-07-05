import {a7} from '/lib/altseven/dist/a7.js';

export var ui = (function() {
  "use strict";

  return {
    //	templates: _templates,
    setLayout: function( mode ){
      let secure = ( a7.model.get( "user" ).userID != '0' );

      switch( mode ){
        case "ide":
          //a7.ui.getNode( a7.ui.selectors['sandBox'] ).style.display='grid';
          a7.ui.getNode( a7.ui.selectors["ide"] ).classList.remove( "hidden" );
          a7.ui.getNode( a7.ui.getSelector("base") ).classList.add( "hidden" );

          break;
        case "home":
          a7.ui.getNode( a7.ui.getSelector("home") ).classList.remove( "hidden" );
          a7.ui.getNode( a7.ui.getSelector("userHome") ).classList.add( "hidden" );
          a7.ui.getNode( a7.ui.selectors["ide"] ).classList.add( "hidden" );
          a7.ui.getNode( a7.ui.getSelector("base") ).classList.remove( "hidden" );
          break;
        case "userhome":
          a7.ui.getNode( a7.ui.getSelector("home") ).classList.add( "hidden" );
          a7.ui.getNode( a7.ui.getSelector("userHome") ).classList.remove( "hidden" );
          a7.ui.getNode( a7.ui.selectors["ide"] ).classList.add( "hidden" );
          a7.ui.getNode( a7.ui.getSelector("base") ).classList.remove( "hidden" );
          break;
        default:

          break;
      }
    }
  };
})();
