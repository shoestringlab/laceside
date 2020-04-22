import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';
//import {main} from '/js/app.main.js';
import * as utils from '/js/app.utils.js';

export var profileEvents = function init(){

  a7.events.subscribe( "profile.show", function( obj ){
    if( obj.userID == a7.model.get( "user" ).userID ){
      let state = a7.ui.getView( 'profile' ).getState();
      state.visible = true;
      state.activeTab = 'pTab1';
      a7.ui.getView( 'profile' ).setState( state );
      a7.ui.getView( 'profile' ).components.modal.open();
    }else{
      a7.remote.invoke( "user.getByUsername", obj )
        .then( function( response ){
          return response.json();
        })
        .then( function( json ){

        });
    }
  });

  a7.events.subscribe( "profile.update", function( obj ){
    a7.remote.invoke( "profile.update", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( success ){
        if( success ){
          a7.events.publish( "profile.refreshProfile");
        }
      });
  });

  a7.events.subscribe( "profile.refreshProfile", function( obj ){
    a7.remote.invoke( "user.getCurrentUser", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( user ){
        sessionStorage.user = JSON.stringify( user );
        a7.model.set( "user", user );
        let currentState = a7.ui.getView('profile').getState();
        a7.ui.getView('profile').setState( { user: user, visible: currentState.visible, activeTab: currentState.activeTab } );
        a7.events.publish( "main.refreshHeader" );
      });
  });
};
