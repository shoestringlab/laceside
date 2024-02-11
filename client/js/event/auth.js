import {a7} from '/lib/altseven/dist/a7.js';
import {ui} from '/js/app.ui.js';
import {auth} from '/js/app.auth.js';

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
    lf.setState( { username: "", password: "", message: ""} );
    lf.components.modal.close();
    a7.events.publish( "profile.setProfile", { user: a7.model.get( "user" ) } );
    a7.router.open( "/" );
  });

  a7.events.subscribe( "auth.failed", function( obj ){
    let lf = a7.ui.getView( "loginForm" );
    let message = `Login failed. <a name="forgot" data-onclick="forgotPassword"> Forgot your password?</a>`;
    lf.setState( Object.assign( lf.getState(), { message: message } ) );
    a7.router.open( "/auth/showlogin" );
  });

  a7.events.subscribe( "auth.logoutsucess", function( obj ){
    auth.authenticate();
  });

  a7.events.subscribe( "auth.showForgotPassword", function( obj ){
    let lf = a7.ui.getView( "loginForm" );
    lf.components.modal.close();
    lf.setState( { username: "", password: "", message: ""} );
    let fpf = a7.ui.getView( "forgotPasswordForm" );
    fpf.setState( { emailAddress: "", message: "" } );
    fpf.components.modal.open();
  });

};
