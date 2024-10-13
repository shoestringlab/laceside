import {userdao as dao} from './userdao.js';
import {usergateway as gateway} from './usergateway.js';

export var userservice = (function() {
  return{
    create: function( userID, username, password, firstName, lastName, nickName, emailAddress ){
      return( dao.create( userID, username, password, firstName, lastName, nickName, emailAddress ) );
    },
    read: function( userID ){
      return( dao.read( userID ) );
    },
    update: function( userID, firstName, lastName, nickName, emailAddress ){
      return( dao.update( userID, firstName, lastName, nickName, emailAddress ) );
    },
    delete: function( userID ){
      return( dao.delete( userID ) );
    },
    getAll: function(){
      return( gateway.getAll() );
    },
    getByUsername: function( username ){
      return( gateway.getByUsername( username ) );
    },
	//public method call
	getUserByUsername: function( username ){
		return( gateway.getUserByUsername( username ) );
	},
	//public method call
	getUserByUserID: function( userID ){
		return( gateway.getUserByUserID( userID ) );
	},
	getByUserID: function( userID ){
		return( gateway.getByUserID( userID ) );
	},
    getEmailAddress: function( emailAddress ){
      return( gateway.getEmailAddress( emailAddress) );
    },
    confirmUser: function( userConfirmationID ){
      return( gateway.confirmUser( userConfirmationID ) );
    },
    changePassword: function( userID, password ){
      return( gateway.changePassword( userID, password ) );
    }
  };

})();
