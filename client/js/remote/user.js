import {a7} from '/lib/altseven/dist/a7.js';

export { getCurrentUser, getByUsername, getUserLibraries, getUserApps, update };

var getCurrentUser = function( obj ){
    var params = { method: 'GET' };
    return a7.remote.fetch( "/api/user", params, true );
  },
  getByUsername = function( obj ){
    var params = { method: 'GET' };
    return a7.remote.fetch( "/api/u/username/" + obj.username, params, true );
  },
  getUserLibraries = function( obj ){
      var params = { method: 'GET' };
      return a7.remote.fetch( "/api/user/" + obj.user.userID + "/libraries", params, true );
  },
  getUserApps = function( obj ){
      let params = { method: 'GET' };
      return a7.remote.fetch( "/api/user/" + obj.user.userID + "/apps", params, true );
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

      return a7.remote.fetch( "/user", params, true );
    };
