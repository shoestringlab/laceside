import {a7} from '/lib/altseven/dist/a7.js';

export { getApps, create, update, read, deleteById };

var getApps = function( obj ){
    let params = { method: 'GET' };
    return a7.remote.fetch( "/apps", params, true );
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

    return a7.remote.fetch( "/app", params, true );

  },
  read = function( obj ){
    var request;

    var params = {  method: 'GET',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    return a7.remote.fetch( "/app/" + obj.app.appID, params, true );
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

    return a7.remote.fetch( "/app/" + obj.appID, params, true );
  },
  deleteById = function( obj ){
    var request;

    var params = {  method: 'DELETE',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    return a7.remote.fetch( "/app/" + obj.appID, params, true );
  };
