 import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';

export var authEvents = function init(){

  a7.events.subscribe( "auth.showLogin", function( obj ){
    a7.ui.getView( "loginForm" ).components.modal.open();
  });

  a7.events.subscribe( "auth.showSignup", function( obj ){
    let signup = a7.ui.getView( "signupForm" );
    let state = signup.getState();
    state.firstName = '';
    state.lastName = '';
    state.email = '';
    state.username = '';
    state.password = '';
    state.passwordIsValid = false;
    state.emailIsValid = false;
    state.usernameIsValid = false;
    signup.setState( state );
    signup.components.modal.open();
    //ui.setLayout( "signup" );
  });

  a7.events.subscribe( "auth.success", function( obj ){
    let lf = a7.ui.getView( "loginForm" );
    lf.setState( { username: "", password: ""} );
    lf.components.modal.close();
    a7.events.publish( "main.home", {} );
  });
};
