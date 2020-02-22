import {a7} from '/lib/altseven/dist/a7.js';

export { getCurrentUser, update };

var getCurrentUser = function( obj ){
    var params = { method: 'GET' };
    return a7.remote.fetch( "/user/" + a7.model.get( "user" ).userID, params, true );
  },
  update = function( obj ){

      var request;

      var params = {  method: 'PUT',
                      headers: {
                        'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                        'Content-Type': 'application/json; charset=utf-8'
                      },
                      body: JSON.stringify( {
                        firstName: obj.firstName,
                        lastName: obj.lastName,
                        nickName: obj.nickName
                      })
                    };

      return a7.remote.fetch( "/user/" + obj.userID, params, true );
    };
