import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export var events = function init(){
  a7.events.subscribe( "menu.jsSandbox", function( obj ){
    a7.log.info( 'jsSandbox menu' );
    a7.ui.getNode( a7.ui.selectors['sandBox'] ).style.display='grid';
  });

  a7.events.subscribe( "library.getLibraries", function( obj ){
    a7.remote.invoke( "libraries.getLibraries", obj );
  });

  a7.events.subscribe( "library.create", function( obj ){
    a7.remote.invoke( "libraries.create", obj );
  });

  a7.events.subscribe( "library.update", function( obj ){
    console.log( "library.update- events" );
    a7.remote.invoke( "libraries.update", obj );
  });

  a7.events.subscribe( "library.delete", function( obj ){
    a7.remote.invoke( "libraries.deleteById", obj );
  });

  a7.events.subscribe( "library.new", function( obj ){
    a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, activeLibraries: a7.model.get( "activeLibraries" ) } );
  });

  a7.events.subscribe( "app.getApps", function( obj ){
    a7.remote.invoke( "apps.getApps", obj );
  });

  a7.events.subscribe( "app.create", function( obj ){
    let args = Object.assign( {}, obj );
    args.jsCode = a7.model.get( "jsCode" ) || "";
    args.htmlCode = a7.model.get( "htmlCode" ) || "";
    args.cssCode = a7.model.get( "cssCode" ) || "";
    args.esModule = a7.model.get( 'esModule' );
    args.libraries = ( a7.model.get( "activeLibraries" ) ? a7.model.get( "activeLibraries" ).map( library => library.libraryID ).join( "," ) : "" );
    a7.remote.invoke( "apps.create", args );
  });

  a7.events.subscribe( "app.update", function( obj ){
    let args = Object.assign( {}, obj );
    args.jsCode = a7.model.get( "jsCode" ) || "";
    args.htmlCode = a7.model.get( "htmlCode" ) || "";
    args.cssCode = a7.model.get( "cssCode" ) || "";
    args.esModule = a7.model.get( 'esModule' );
    args.libraries = ( a7.model.get( "activeLibraries" ) ? a7.model.get( "activeLibraries" ).map( library => library.libraryID ).join( "," ) : "" );
    a7.remote.invoke( "apps.update", args );
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

    a7.ui.getView('buttonbar').setState( { esModule: app.esModule } );
    a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ), library: { libraryID: 0, name: "", link: "" }, activeLibraries: activeLibs } );
    a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: app } );
    a7.events.publish( "sandbox.execute", {} );
  });

  a7.events.subscribe( "app.delete", function( obj ){
    a7.remote.invoke( "apps.deleteById", obj );
  });

  a7.events.subscribe( "app.new", function( obj ){
    a7.ui.getView('jseditor').props.editor.setValue( "" );
    a7.ui.getView('htmleditor').props.editor.setValue( "" );
    a7.ui.getView('csseditor').props.editor.setValue( "" );
    a7.ui.getView('buttonbar').setState( { esModule: false } );
    a7.ui.getView('apps').setState( { apps: a7.model.get( "apps" ), app: { appID: 0, name: "" } } );
    a7.events.publish( "sandbox.execute", {} );
  });

  a7.events.subscribe( "tabs.setTab", function( obj ){
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
