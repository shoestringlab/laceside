import {a7} from '/lib/altseven/dist/a7.js';
//import {ui} from '/js/app.ui.js';
//import {main} from '/js/app.main.js';
import * as utils from '/js/app.utils.js';

export var appEvents = function init(){

  a7.events.subscribe( "apps.create", function( obj ){
    let args = Object.assign( {}, obj );
    args.jsCode = a7.model.get( "jsCode" ) || "";
    args.htmlCode = a7.model.get( "htmlCode" ) || "";
    args.cssCode = a7.model.get( "cssCode" ) || "";
    args.esModule = a7.model.get( 'esModule' ) || 0;
    args.libraries = ( a7.model.get( "activeLibraries" ) ? a7.model.get( "activeLibraries" ).map( library => library.libraryID ).join( "," ) : "" );
    a7.remote.invoke( "apps.create", args )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var app = json;
        app.esModule = app.esModule.data[0];
        var apps = a7.model.get( "apps" ) || [];
        apps.push( app );
        a7.model.set( "apps", apps );

        a7.ui.getView('apps').setState( { apps: apps, app: app, offset: 0 } );

        a7.ui.getView('userHome').setState( { user: a7.model.get( "user" ), apps: apps, offset: 0, showNewAppForm: false } );
        utils.showNotice( "The application was saved." );
      });
  });

  a7.events.subscribe( "apps.update", function( obj ){
    let args = Object.assign( {}, obj );
    args.jsCode = a7.model.get( "jsCode" ) || "";
    args.htmlCode = a7.model.get( "htmlCode" ) || "";
    args.cssCode = a7.model.get( "cssCode" ) || "";
    args.esModule = a7.model.get( 'esModule' );
    args.libraries = ( a7.model.get( "activeLibraries" ) ? a7.model.get( "activeLibraries" ).map( library => library.libraryID ).join( "," ) : "" );
    a7.remote.invoke( "apps.update", args )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var app = json;
        app.esModule = app.esModule.data[0];
        var apps = a7.model.get( "apps" );
        for( var ix = 0; ix < apps.length; ix++ ){
          if (apps[ix].appID === app.appID) {
            apps[ix] = app;
            break;
          }
        }
        a7.model.set( "apps", apps );
        a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: app, offset: 0 } );
        utils.showNotice( "The application was saved." );
      });
  });

  a7.events.subscribe( "apps.load", function( obj ){
    let app = a7.model.get( "apps" ).filter( application => application.appID === obj.appID )[0];
    app = app || { appID: 0, name: "", libraries: "", jsCode: "", htmlCode: "", cssCode: "" };
    let libraries = a7.model.get( "libraries" );
    let appLibs = app.libraries.split(",").map( libID => libID );
    let activeLibs = ( app.libraries ? libraries.filter( lib => appLibs.indexOf( lib.libraryID ) >= 0 ) : [] );

    a7.model.set( "esModule", app.esModule );
    a7.model.set( "activeLibraries", activeLibs );
    a7.ui.getView('jseditor').components.editor.setValue( app.jsCode );
    a7.ui.getView('htmleditor').components.editor.setValue( app.htmlCode );
    a7.ui.getView('csseditor').components.editor.setValue( app.cssCode );

    let editorSize = a7.model.get( "editorSize" );
    let height = editorSize.height;
    let cmDivs = document.querySelectorAll( ".CodeMirror" );
    cmDivs.forEach( function( div ){
      div.setAttribute( "style", "height:" + ( height - 65 ) + "px !important");
    });

    let appsState = a7.ui.getView('apps').getState();
    let libsState = a7.ui.getView('libraries').getState();
    a7.ui.getView('buttonbar').setState( { esModule: app.esModule } );
    a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, activeLibraries: activeLibs, offset: libsState.offset } );
    a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: app, offset: appsState.offset } );
    a7.events.publish( "menu.update", { user: a7.model.get("appUser"), app: app } );
    a7.events.publish( "sandbox.execute", {} );
  });

  a7.events.subscribe( "apps.delete", function( obj ){
    a7.remote.invoke( "apps.deleteById", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        if( json ){
          var apps = a7.model.get( "apps" );

          var deleted = apps.find( function( app, idx ){
              if (app.appID === obj.appID ) {
                apps.splice( idx, 1 );
                  return true;
              }
          });
        }

        a7.model.set( "apps", apps );
        // update top bar breadcrumb
        a7.events.publish( "menu.update", {user: a7.model.get("user")});
        a7.events.publish( "apps.new", {} );
        //a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: { appID: 0, name: '' }, offset: 0 } );
        utils.showNotice( "The application was deleted." );
      });
  });

  a7.events.subscribe( "apps.new", function( obj ){
    if( a7.ui.getView('jseditor') !== undefined && a7.ui.getView('jseditor').components.editor ){
        a7.ui.getView('jseditor').components.editor.setValue( "" );
        a7.ui.getView('htmleditor').components.editor.setValue( "" );
        a7.ui.getView('csseditor').components.editor.setValue( "" );
        a7.ui.getView('buttonbar').setState( { esModule: 0 } );
    }
    a7.model.set( "jsCode", "" );
    a7.model.set( "cssCode", "" );
    a7.model.set( "htmlCode", "" );
    a7.model.set( "esModule", 0 );
    a7.model.set( "activeLibraries", [] );

    a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ) || [], library: { libraryID: 0, name: "", link: "" }, activeLibraries: a7.model.get( "activeLibraries" ), offset: 0 } );
    a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ) || [], app: { appID: 0, name: "" }, offset: 0 } );
    a7.events.publish( "sandbox.execute", {} );
  });

};
