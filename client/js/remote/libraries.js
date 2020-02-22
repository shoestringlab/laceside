import {a7} from '/lib/altseven/dist/a7.js';

export { getLibraries, create, read, update, deleteById };

var getLibraries = function( obj ){
    var params = { method: 'GET' };
    return a7.remote.fetch( "/libraries", params, true );
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

    return a7.remote.fetch( "/library", params, true );
  },
  read = function( obj ){
    var request;

    var params = {  method: 'GET',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    return a7.remote.fetch( "/library/" + obj.library.libraryID, params, true );

/*     promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){

      }); */
  },
  update = function( obj ){
    var request;
    var params = {  method: 'PUT',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify( {
                    name: obj.name,
                    link: obj.link } )
                  };

    return a7.remote.fetch( "/library/" + obj.libraryID, params, true );
  },
  deleteById = function( obj ){
    var request;

    var params = {  method: 'DELETE',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    return a7.remote.fetch( "/library/" + obj.libraryID, params, true );
  };
