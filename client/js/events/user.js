import {a7} from '/lib/altseven/dist/a7.js';

export var userEvents = function init(){

  a7.events.subscribe( "user.show", function( obj ){
    a7.remote.invoke( "user.getByUsername", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( user ){
        a7.model.set( "appUser", user );
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
