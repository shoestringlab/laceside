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

  a7.events.subscribe( "sandbox.execute", function( obj ){
    a7.ui.views['console'].setState( { consoleText: '' } );
    let jsCode = a7.model.get( 'jsCode' ) || '';
    let htmlCode = a7.model.get( 'htmlCode' ) || '';
    let cssCode = a7.model.get( 'cssCode' ) || '';

    var doc = document.getElementById('iframe').contentWindow.document;
    let scripts = doc.querySelectorAll( "script.jsapp" );
    if( scripts !== null ){
      scripts.forEach( function( script ){
        doc.head.removeChild( script );
      });
    }
    let libraries = a7.model.get( "activeLibraries" );

    let scriptTags =[];
    //doc.open();

    if( libraries && libraries.length ){
      let links = libraries.map( library => library.link ).join( "','" );

      utils.addModLazy( doc );

      let mlScript = `modlazy.load(['${links}'], function(){
        ${jsCode}
      });`;
      scriptTags.push( doc.createElement("script") );
      scriptTags[ scriptTags.length - 1 ].setAttribute( "class", "jsapp" );
      scriptTags[ scriptTags.length - 1 ].setAttribute( "id", "codeBlock" );
      var inline = doc.createTextNode( mlScript );
      scriptTags[ scriptTags.length - 1 ].appendChild( inline );
    }else{
      // no third party libraries (except possibly ES modules)
      scriptTags.push( doc.createElement("script") );
      scriptTags[ scriptTags.length - 1 ].setAttribute(  "class", "jsapp" );
      if( a7.model.get( 'esModule' ) ){
        scriptTags[ scriptTags.length - 1 ].setAttribute( "type", "module" );
      }
      var inline = doc.createTextNode( jsCode );
      scriptTags[ scriptTags.length - 1 ].appendChild( inline );
    }

//    doc.write( `${htmlCode}` );

    doc.body.innerHTML = htmlCode;

    if( cssCode.length ){
      let styleTag = doc.createElement( "style" );
      styleTag.innerText = cssCode;
      doc.head.appendChild( styleTag );
    }
    scriptTags.forEach( function( tag ){
      doc.head.appendChild( tag );
    });

    //doc.close();
  });
}
