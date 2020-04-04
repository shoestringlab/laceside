import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';
import {main} from '/js/app.main.js';
import * as utils from '/js/app.utils.js';
import {UserHome} from '/js/components/userhome.js';
import {Header} from '/js/components/header.js';
import {Profile} from '/js/components/profile.js';

export var events = function init(){

  a7.events.subscribe( "ide.show", function( obj ){
    ui.setLayout( "ide" );

    if( obj.appID ){
      if( a7.model.get( "apps" ) === undefined ){

      }else{
        a7.events.publish( "apps.load", obj );
      }
    }
  });
}
