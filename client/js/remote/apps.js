import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export { getApps, create, update, read, deleteById };

var getApps = function( obj ){
    var params = { method: 'GET' };
    var promise = a7.remote.fetch( "/apps", params, true );

    promise
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
                      jsCode: obj.jsCode,
                      htmlCode: obj.htmlCode,
                      cssCode: obj.cssCode,
                      libraries: obj.libraries,
                      esModule: obj.esModule
                    })
                  };

    var promise = a7.remote.fetch( "/app", params, true );

    promise
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

    var promise = a7.remote.fetch( "/app/" + obj.app.appID, params, true );

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
                    body: JSON.stringify( {
                      name: obj.name,
                      jsCode: obj.jsCode,
                      htmlCode: obj.htmlCode,
                      cssCode: obj.cssCode,
                      libraries: obj.libraries,
                      esModule: obj.esModule } )
                  };

    var promise = a7.remote.fetch( "/app/" + obj.appID, params, true );

    promise
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

    var promise = a7.remote.fetch( "/app/" + obj.appID, params, true );

    promise
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
      });
  };
