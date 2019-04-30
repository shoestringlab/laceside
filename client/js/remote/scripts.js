import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export { getScripts, create, read, deleteById };

var getScripts = function( obj ){
    var params = { method: 'GET' };
    var promise = a7.remote.fetch( "/scripts", params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        let scripts = [];
        json.records.forEach( function( script, idx ){
          scripts.push( script );
        });
        a7.model.set( "scripts", scripts );
        //a7.ui.getView('scripts').setState( { scripts: json } );
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
                      scriptID: obj.scriptID,
                      name: obj.name,
                      text: obj.text
                    })
                  };

    var promise = a7.remote.fetch( "/script", params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var script = json;
        var scripts = a7.model.get( "scripts" );
        scripts.push( script );
        a7.model.set( "scripts", scripts );

      //  a7.ui.getView('scripts').setState( { scripts: scripts } );
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

    var promise = a7.remote.fetch( "/script/" + obj.script.scriptID, params, true );

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
                    body: JSON.stringify( { scriptID: obj.scriptID,
                    name: obj.name,
                    link: obj.link } )
                  };

    var promise = a7.remote.fetch( "/script/" + obj.script.scriptID, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        var script = json;

        var scripts = a7.model.get( "scripts" );
        var result = scripts.find( function( lib, idx ){
            if (lib.scriptID === script.scriptID) {
                scripts[idx] = script;
                return true;
            }
        });
        a7.model.set( "scripts", scripts );
        //a7.ui.getView('scripts').setState( { scripts: a7.model.get( "scripts" ) } );
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

    var promise = a7.remote.fetch( "/script/" + obj.script.scriptID, params, true );

    promise
      .then( function( response ) {
        // get json response and pass to handler to resolve
        return response.json();
      })
      .then( function( json ){
        if( json ){
          var scripts = a7.model.get( "scripts" );

          var deleted = scripts.find( function( script, idx ){
              if (script.scriptID === obj.script.scriptID) {
                scripts.splice( idx, 1 );
                  return true;
              }
          });
        }

        a7.model.set( "scripts", scripts );
        //a7.ui.getView('scripts').setState( { scripts: a7.model.get( "scripts" ) } );
      });
  };
