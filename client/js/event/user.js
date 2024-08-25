import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export var userEvents = function init(){

  a7.events.subscribe( "user.create", function( obj ){
    a7.remote.invoke( "user.create", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( user ){
        a7.ui.getView("signupForm").components.modal.close();
        let mState = a7.ui.getView( "message" ).getState();
        mState.message = "Your account has been created. Please confirm your email address to start using the site.";
        a7.ui.getView( "message" ).setState(mState);
        a7.ui.getView( "message" ).components.modal.open();
      });
  });

  a7.events.subscribe( "user.confirm", function( obj ){
    a7.remote.invoke( "user.confirm", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( user ){
        a7.events.publish( "main.home" );
        a7.events.publish( "main.showMessage", { message: "Your account has been confirmed, you may login to continue." } );
      });
  });

  a7.events.subscribe( "user.show", function( obj ){
    a7.remote.invoke( "user.getByUsername", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( user ){
        a7.model.set( "author", user );
        //reset the editor so no apps are cached in the background
        a7.events.publish( "apps.new", {} );
        a7.events.publish( "main.run", { view: 'userhome'} );
      });
  });

  a7.events.subscribe( "user.update", function( obj ){
    a7.remote.invoke( "user.update", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( user ){
        if( user.userID ){
          a7.events.publish( "profile.refreshProfile" );
        }
      });
  });

  a7.events.subscribe( "user.getUserLibraries", function( obj ){
    a7.remote.invoke( "user.getUserLibraries", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        a7.model.set( "libraries", json );
        a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, offset: 0 } );
        // if appID was passed, this event came from ide.show and we need to load the app
        if( obj.appID && a7.model.get( "apps" ) !== undefined ){
          a7.events.publish( "apps.load", obj );
        }
      });
  });

  a7.events.subscribe( "user.getUserApps", function( obj ){
    a7.remote.invoke( "user.getUserApps", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        if( json.length ){
          json.forEach( function( app, idx ){
            app.esModule = app.esModule.data[0];
          });
        }
        a7.model.set( "apps", json );
        a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: { appID: 0, name: "" }, offset: 0 } );
        a7.ui.getView('userHome').setState( { user: obj.user, apps: a7.model.get( "apps" ), offset: 0 } );

        // if appID was passed, this event came from ide.show and we need to load the app
        if( obj.appID && a7.model.get( "libraries" ) !== undefined ){
          a7.events.publish( "apps.load", obj );
        }
      });
  });

  a7.events.subscribe( "user.changePassword", function( obj ){
    a7.remote.invoke( "user.changePassword", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( success ){
        if( success ){
          utils.showNotice( "Password changed." );
          let profile = a7.ui.getView( "profile" );
          let updated = { passwordIsValid: false, passwordMatches: false, currentPasswordMatches: false };
          profile.setState( Object.assign( profile.getState(), updated ) );
        }
      });
  });

  a7.events.subscribe( "user.sendResetEmail", function( obj ){
    a7.remote.invoke( "user.sendResetEmail",  obj )
      .then( function( response ){
        return response.json();
      })
      .then( function( success ){
        if( success ){
          let fpf = a7.ui.getView( "forgotPasswordForm" );
          fpf.setState( { emailAddress: "", message: "" } );
          fpf.components.modal.close();
          let msg = a7.ui.getView( "message" );
          msg.setState( { message: "An email message with a link to reset your password has been sent to you." } );
          msg.components.modal.open();
        }
      });
  });

  a7.events.subscribe( "user.showResetPasswordForm", function( obj ){
    a7.remote.invoke( "user.getPasswordReset",  obj )
      .then( function( response ){
        return response.json();
      })
      .then( function( passwordReset ){
        if( new Date( passwordReset.expires ) < new Date() ){
          let msg = a7.ui.getView( "message" );
          msg.setState( { message: "That link has expired. Please request another password reset link." } );
          msg.components.modal.open();
        }else{
          let rp = a7.ui.getView( "resetPasswordForm" );
          rp.setState( { passwordIsValid: false, passwordMatches: false, resetID: obj.resetID, message: "" } );
          rp.components.modal.open();
        }
      });
  });

  a7.events.subscribe( "user.resetPassword", function( obj ){
    a7.remote.invoke( "user.resetPassword", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( success ){

        let rpf = a7.ui.getView( "resetPasswordForm" );
        if( success ){
          // close the form
          rpf.setState( {  passwordIsValid: false, passwordMatches: false, resetID: 0, message: "" } );
          rpf.components.modal.close();

          utils.showNotice( "Password reset successful." );
          let msg = a7.ui.getView( "message" );
          msg.setState( { message: "Your password has been reset. You may now login using your new password." } );
          msg.components.modal.open();
        }else{
          rpf.setState( Object.assign( rpf.getState(), { passwordIsValid: false, passwordMatches: false, message: "There was an error attempting to reset your password." } ) );
        }
      });
  });


/*   // get apps and libraries together
  a7.events.subscribe( "user.getUserData", function( obj ){
    a7.remote.invoke( "user.getUserData", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        if( json.apps.length ){
          json.apps.forEach( function( app, idx ){
            app.esModule = app.esModule.data[0];
          });
        }
        a7.model.set( "apps", json.apps );
        a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: { appID: 0, name: "" }, offset: 0 } );
        a7.ui.getView('userHome').setState( { user: obj.user, apps: a7.model.get( "apps" ), offset: 0 } );
      });
  });
 */

};
