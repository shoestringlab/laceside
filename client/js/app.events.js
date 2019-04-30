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

    var doc = document.getElementById('iframe').contentWindow.document;
    let scripts = doc.querySelectorAll( "script" );
    if( scripts !== null ){
      scripts.forEach( function( script ){
        doc.head.removeChild( script );
      });
    }
    let libraries = a7.model.get( "activeLibraries" );

    let scriptTags =[];

    libraries.forEach( function( library ){
      scriptTags.push( doc.createElement("script") );
      scriptTags[ scriptTags.length - 1 ].setAttribute( "src", library.link );
    });

    scriptTags.push( doc.createElement("script") );
    scriptTags[ scriptTags.length - 1 ].setAttribute( "id", "codeBlock" );
    if( obj.esModule ){
      scriptTags[ scriptTags.length - 1 ].setAttribute( "type", "module" );
    }
    doc.open();
    var inline = doc.createTextNode( obj.editorContents );
    scriptTags[ scriptTags.length - 1 ].appendChild( inline );

    doc.write( "<html><body></body></html>" );
    scriptTags.forEach( function( tag ){
      doc.head.appendChild( tag );
    });
    doc.close();
  });

}
