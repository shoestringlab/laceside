import {a7} from '/lib/altseven/dist/a7.js';
import {cuid} from '/lib/cuid/index.mjs';

export { create, update, read, deleteById };

var create = function( obj ){
    var request;

    var params = {  method: 'POST',
                    //encoding: 'application/x-www-form-urlencoded',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({
                      appID: cuid(),
                      name: obj.name,
                      jsCode: obj.jsCode,
                      htmlCode: obj.htmlCode,
                      cssCode: obj.cssCode,
                      libraries: obj.libraries,
                      esModule: obj.esModule
                    })
                  };

    return a7.remote.fetch( "/api/app", params, true );

  },
  read = function( obj ){
    var request;

    var params = {  method: 'GET',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    return a7.remote.fetch( "/api/app/" + obj.app.appID, params, true );
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

    return a7.remote.fetch( "/api/app/" + obj.appID, params, true );
  },
  deleteById = function( obj ){
    var request;

    var params = {  method: 'DELETE',
                    headers: {
                      'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                      'Content-Type': 'application/json; charset=utf-8'
                    }
                  };

    return a7.remote.fetch( "/api/app/" + obj.appID, params, true );
  };
