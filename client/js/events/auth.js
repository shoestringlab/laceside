import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';

export var authEvents = function init(){

  a7.events.subscribe( "auth.showLogin", function( obj ){
    ui.setLayout( "auth" );
  });

  a7.events.subscribe( "auth.showSignup", function( obj ){
    let signup = a7.ui.getView( "signupForm" );
    let state = signup.getState();
    state.firstName = '';
    state.lastName = '';
    state.email = '';
    state.username = '';
    state.password = '';
    signup.setState( state );
    ui.setLayout( "signup" );
  });

};
