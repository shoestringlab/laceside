import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';
import * as utils from '/js/app.utils.js';
import {UserHome} from '/js/components/userhome.js';
import {Profile} from '/js/components/profile.js';

export var mainEvents = function init(){

  a7.events.subscribe( "main.home", function( obj ){
    let user = a7.model.get( "user" );
    a7.model.set( "appUser", user );
    let view = ( user.userID ? 'userhome' : 'home' );
    //reset the editor so no apps are cached in the background
    a7.events.publish( "apps.new", {} );
    // run the main
    a7.events.publish( "main.run", { view: view } );
  });

  a7.events.subscribe( "main.run", function( obj ){

    UserHome( { id: 'userHome', selector: "#userHome", user: a7.model.get( "appUser" ), apps: a7.model.get("apps") || [] } );
    a7.events.publish( "main.refreshHeader", {} );
    //Header( { id: 'header', user: a7.model.get( "user" ), selector: "#headerRight" } );
    // default appUser to the current user, which may be the anon user
    //obj.appUser = obj.appUser || user;

    if( a7.model.get( "appUser" ).userID != '0'  ){
      obj.offset = 0;
      obj.user = a7.model.get( "appUser" );

      // initial actions after login
      a7.events.publish( "user.getUserLibraries", obj );
      a7.events.publish( "user.getUserApps",  obj );
    }
    a7.events.publish( "menu.update", { user: a7.model.get( "appUser" ) } );
    ui.setLayout( obj.view );
  });

  a7.events.subscribe( "main.showMessage", function( obj ){
    let mState = a7.ui.getView( "message" ).getState();
    mState.message = obj.message;
    a7.ui.getView( "message" ).setState(mState);
    a7.ui.getView( "message" ).components.modal.open();
  });

  a7.events.subscribe( "main.refreshHeader", function( obj ){
    let header = a7.ui.getView( "header" );
    let state = header.getState();
    state.user = a7.model.get( "user" );
    header.setState( state );
  });
};
