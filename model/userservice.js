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
  create: function( userID, username, password, firstName, lastName ){
    return( dao.create( userID, username, password, firstName, lastName ) );
  },
  read: function( userID ){
    return( dao.read( userID ) );
  },
  update: function( userID, firstName, lastName, nickName ){
    return( dao.update( userID, firstName, lastName, nickName ) );
  },
  delete: function( userID ){
    return( dao.delete( userID ) );
  }
};
