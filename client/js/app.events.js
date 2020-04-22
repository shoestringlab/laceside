import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';
import {main} from '/js/app.main.js';
import * as utils from '/js/app.utils.js';
import {UserHome} from '/js/components/userhome.js';
import {Profile} from '/js/components/profile.js';

export var events = function init(){

  a7.events.subscribe( "ide.show", function( obj ){
    ui.setLayout( "ide" );

/*     if( obj.appID ){
      if( a7.model.get( "apps" ) === undefined ){
        a7.events.publish( "user.getUserApps", obj );
        a7.events.publish( "user.getUserLibraries", obj );
      }else{
        a7.events.publish( "apps.load", obj );
      }
    } */
    a7.remote.invoke( "user.getByUsername", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( user ){
        a7.model.set( "appUser", user );
        obj.user = user;
        if( a7.model.get( "apps" ) === undefined ){
          /* a7.events.publish( "user.getUserLibraries", obj );
          a7.events.publish( "user.getUserApps", obj ); */
          a7.events.publish( "main.run", obj );
        }else{
          a7.events.publish( "apps.load", obj );
        }
      });
  });
}
