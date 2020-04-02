import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';
import * as utils from '/js/app.utils.js';
import {UserHome} from '/js/components/userhome.js';
import {Header} from '/js/components/header.js';
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
    Header( { id: 'header', user: a7.model.get( "user" ), selector: "#headerRight" } );
    Profile( { id: 'profile', selector: "#profile", user: a7.model.get( "user" ) } );

    // default appUser to the current user, which may be the anon user
    //obj.appUser = obj.appUser || user;

    if( a7.model.get( "appUser" ).userID  ){
      // initial actions after login
      a7.events.publish( "user.getUserLibraries", { offset: 0, user: a7.model.get( "appUser" ) } );
      a7.events.publish( "user.getUserApps",  {offset: 0, user: a7.model.get( "appUser" ) } );
    }
    a7.events.publish( "menu.update", { user: a7.model.get( "appUser" ) } );
    ui.setLayout( obj.view );
  });
};
