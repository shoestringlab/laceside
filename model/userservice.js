const userdao = require( './userdao' );
const usergateway = require( './usergateway' );

const dao = userdao();
const gateway = usergateway();

module.exports = {
  getAll: function(){
    return( gateway.getAll() );
  },
  getByUsername: function( username ){
    return( gateway.getByUsername( username ) );
  },
  getEmailAddress: function( emailAddress ){
    return( gateway.getEmailAddress( emailAddress) );
  },
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
  confirmUser: function( userConfirmationID ){
    return( dao.confirmUser( userConfirmationID ) );
  }
};
