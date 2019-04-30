import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export { getLibraries, create, read, deleteById };

var getLibraries = function( obj ){
    var params = { method: 'GET' };
    var promise = a7.remote.fetch( "/libraries?offset=" + obj.offset, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        let libraries = ( obj.offset === 0 ? [] : a7.model.get( "libraries" ) );
        if( json.records ){
          json.records.forEach( function( library, idx ){
            libraries.push( library );
          });
        }
        a7.model.set( "libraries", libraries );
        a7.ui.getView('libraries').setState( { libraries: libraries } );
      });
  },
  create = function( obj ){
    var request;

    var params = {  method: 'POST',
                    //encoding: 'application/x-www-form-urlencoded',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({
                      name: obj.name,
                      link: obj.link
                    })
                  };

    var promise = a7.remote.fetch( "/library", params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var library = json;
        var libraries = a7.model.get( "libraries" );
        libraries.push( library );
        a7.model.set( "libraries", libraries );

        a7.ui.getView('libraries').setState( { libraries: libraries } );
      });
  },
  read = function( obj ){
    var request;

    var params = {  method: 'GET',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    var promise = a7.remote.fetch( "/library/" + obj.library.libraryID, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){

      });
  },
  update = function( obj ){
    var request;

    var params = {  method: 'PUT',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify( { libraryID: obj.libraryID,
                    name: obj.name,
                    link: obj.link } )
                  };

    var promise = a7.remote.fetch( "/library/" + obj.library.libraryID, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var library = json;

        var libraries = a7.model.get( "libraries" );
        var result = libraries.find( function( lib, idx ){
            if (lib.libraryID === library.libraryID) {
                libraries[idx] = library;
                return true;
            }
        });
        a7.model.set( "libraries", libraries );
        a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ) } );
      });
  },
  deleteById = function( obj ){
    var request;

    var params = {  method: 'DELETE',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    var promise = a7.remote.fetch( "/library/" + obj.library.libraryID, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        if( json ){
          var libraries = a7.model.get( "libraries" );

          var deleted = libraries.find( function( library, idx ){
              if (library.libraryID === obj.library.libraryID) {
                libraries.splice( idx, 1 );
                  return true;
              }
          });
        }

        a7.model.set( "libraries", libraries );
        a7.ui.getView('libraries').setState( { libraries: a7.model.get( "libraries" ) } );
      });
  };
