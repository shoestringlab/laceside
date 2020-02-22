import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export var events = function init(){
  a7.events.subscribe( "menu.jsSandbox", function( obj ){
    a7.ui.getNode( a7.ui.selectors['sandBox'] ).style.display='grid';
  });

  a7.events.subscribe( "library.getLibraries", function( obj ){
    a7.remote.invoke( "libraries.getLibraries", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        a7.model.set( "libraries", json );
        a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, offset: 0 } );
      });
  });

  a7.events.subscribe( "library.create", function( obj ){
    a7.remote.invoke( "libraries.create", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var library = json;
        var libraries = a7.model.get( "libraries" );
        libraries.push( library );
        a7.model.set( "libraries", libraries );

        a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: library, offset: 0 } );

        utils.showNotice( "New library saved." );

      });
  });

  a7.events.subscribe( "library.update", function( obj ){
    a7.remote.invoke( "libraries.update", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var library = json;

        var libraries = a7.model.get( "libraries" );
        for( var ix = 0; ix < libraries.length; ix++ ){
          if (libraries[ix].libraryID === library.libraryID) {
            libraries[ix] = library;
            break;
          }
        }
        a7.model.set( "libraries", libraries );
        a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: library, offset: 0 } );
        utils.showNotice( "Library saved." );
      });
  });

  a7.events.subscribe( "library.delete", function( obj ){
    a7.remote.invoke( "libraries.deleteById", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        if( json ){
          var libraries = a7.model.get( "libraries" );

          var deleted = libraries.find( function( library, idx ){
              if (library.libraryID === parseInt( obj.libraryID, 10 ) ) {
                libraries.splice( idx, 1 );
                  return true;
              }
          });
        }

        a7.model.set( "libraries", libraries );
        a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, offset: 0 } );

        utils.showNotice( "Library deleted." );
      });
  });

  a7.events.subscribe( "library.new", function( obj ){
    let libsState = a7.ui.getView('libraries').getState();
    a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, activeLibraries: a7.model.get( "activeLibraries" ), offset: libsState.offset } );
  });

  a7.events.subscribe( "app.getApps", function( obj ){
    a7.remote.invoke( "apps.getApps", obj )
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
      });
  });

  a7.events.subscribe( "app.create", function( obj ){
    let args = Object.assign( {}, obj );
    args.jsCode = a7.model.get( "jsCode" ) || "";
    args.htmlCode = a7.model.get( "htmlCode" ) || "";
    args.cssCode = a7.model.get( "cssCode" ) || "";
    args.esModule = a7.model.get( 'esModule' );
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
        utils.showNotice( "The application was saved." );
      });
  });

  a7.events.subscribe( "app.update", function( obj ){
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

  a7.events.subscribe( "app.load", function( obj ){
    let app = a7.model.get( "apps" ).filter( application => application.appID === parseInt( obj.appID, 10 ) )[0];
    let libraries = a7.model.get( "libraries" );
    let appLibs = app.libraries.split(",").map( libID => parseInt( libID,10 ));
    let activeLibs = ( app.libraries ? libraries.filter( lib => appLibs.indexOf( lib.libraryID ) >= 0 ) : [] );

    a7.model.set( "activeLibraries", activeLibs );
    a7.ui.getView('jseditor').props.editor.setValue( app.jsCode );
    a7.ui.getView('htmleditor').props.editor.setValue( app.htmlCode );
    a7.ui.getView('csseditor').props.editor.setValue( app.cssCode );

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
    a7.events.publish( "sandbox.execute", {} );
  });

  a7.events.subscribe( "app.delete", function( obj ){
    a7.remote.invoke( "apps.deleteById", obj )
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        if( json ){
          var apps = a7.model.get( "apps" );

          var deleted = apps.find( function( app, idx ){
              if (app.appID === parseInt( obj.appID, 10 ) ) {
                apps.splice( idx, 1 );
                  return true;
              }
          });
        }

        a7.model.set( "apps", apps );
        a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: { appID: 0, name: '' }, offset: 0 } );
        utils.showNotice( "The application was deleted." );
      });
  });

  a7.events.subscribe( "app.new", function( obj ){
    a7.ui.getView('jseditor').props.editor.setValue( "" );
    a7.ui.getView('htmleditor').props.editor.setValue( "" );
    a7.ui.getView('csseditor').props.editor.setValue( "" );
    a7.ui.getView('buttonbar').setState( { esModule: 0 } );
    a7.model.set( "activeLibraries", [] );
    a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, activeLibraries: a7.model.get( "activeLibraries" ), offset: 0 } );
    a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: { appID: 0, name: "" }, offset: 0 } );
    a7.events.publish( "sandbox.execute", {} );
  });

  a7.events.subscribe( "profile.show", function( obj ){
    let state = a7.ui.getView( 'profile' ).getState();
    state.visible = true;
    a7.ui.getView( 'profile' ).setState( state );
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
        a7.ui.getView('header').setState( { user: user } );
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

  a7.events.subscribe( "tabs.setTab", function( obj ){
    a7.model.set( "activeTab", obj.tab );
    a7.ui.getView('tabs').state.tabs.forEach( function( tab ){
      document.querySelector( "#" + tab ).style.display = ( tab === obj.tab ? 'block' : 'none' );
      a7.ui.getView('tabs').element.querySelector( "div.tabs div[name='" + tab + "']" ).style.backgroundColor = ( tab === obj.tab ? '#99f' : '' );
    });
    a7.ui.getView( obj.tab.toLowerCase() ).props.editor.refresh();
  });

  a7.events.subscribe( "sandbox.execute", function( obj ){
    a7.ui.views['console'].setState( { consoleText: '' } );
    let jsCode = a7.model.get( 'jsCode' ) || '';
    let htmlCode = a7.model.get( 'htmlCode' ) || '';
    let cssCode = a7.model.get( 'cssCode' ) || '';

    var doc = document.getElementById('iframe').contentWindow.document;
    let libs = doc.querySelectorAll( ".jsapp" );
    // get any third party libraries specified
    if( libs !== null ){
      libs.forEach( function( lib ){
        doc.head.removeChild( lib );
      });
    }
    let styles = doc.querySelectorAll( "style" );
    if( styles !== null ){
      styles.forEach( function( style ){
        doc.head.removeChild( style );
      });
    }
    let activeLibraries = a7.model.get( "activeLibraries" );

    let scriptTags =[];

    // add activeLibraries to the page
    if( activeLibraries && activeLibraries.length ){
      let cssLinks = activeLibraries.filter( library => library.link.endsWith( ".css" ) ).map( library => library.link );
      let jslinks = activeLibraries.filter( library => library.link.endsWith( ".js" ) ).map( library => library.link ).join( "','" );
      // css gets added as link tags
      cssLinks.forEach( function( link ){
        scriptTags = utils.addTag( scriptTags, doc, 'link', link );
      });
      // js activeLibraries get added via modlazy
      if( jslinks.length ){
        utils.addModLazy( doc );

        let mlScript = `modlazy.load(['${jslinks}'], function(){
          ${jsCode}
        });`;

        scriptTags = utils.addTag( scriptTags, doc, 'script', '', mlScript );
      }else{
        scriptTags = utils.addTag( scriptTags, doc, 'script', '', jsCode );
      }
    }else{
      // no third party libraries (except possibly ES modules)
      scriptTags = utils.addTag( scriptTags, doc, 'script', '', jsCode );
    }

    // add html
    doc.body.innerHTML = htmlCode;

    // inline css
    if( cssCode.length ){
      let styleTag = doc.createElement( "style" );
      styleTag.innerText = cssCode;
      doc.head.appendChild( styleTag );
    }
    // all script tags
    scriptTags.forEach( function( tag ){
      doc.head.appendChild( tag );
    });

  });
}
