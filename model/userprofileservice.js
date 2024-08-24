import {userprofiledao as dao} from './userprofiledao.js';

export var userprofileservice = (function() {
  return{
    create: function( userID, profilePic ){
      return( dao.create( userID, profilePic ) );
    },
    read: function( userID ){
      return( dao.read( userID ) );
    },
    update: function( userID, profilePic ){
      return( dao.update( userID, profilePic ) );
    },
    delete: function( userID ){
      return( dao.delete( userID ) );
    }
  };

})();
