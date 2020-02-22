const userprofiledao = require( './userprofiledao' );

const dao = userprofiledao();

module.exports = {
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
