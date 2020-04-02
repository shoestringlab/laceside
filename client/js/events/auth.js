import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';

export var authEvents = function init(){

  a7.events.subscribe( "auth.showLogin", function( obj ){
    ui.setLayout( "auth" );
  });

  a7.events.subscribe( "auth.showSignup", function( obj ){
    ui.setLayout( "signup" );
  });

};
