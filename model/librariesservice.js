const librariesdao = require( './librariesdao' );
const librariesgateway = require( './librariesgateway' );

const dao = librariesdao();
const gateway = librariesgateway();

module.exports = {
   getLibraries: function( userID, count, offset ){
    return( gateway.getLibraries( userID, count, offset ) );
  },
  create: function( userID, link, name ){
    return( dao.create( userID, link, name ) );
  },
  read: function( libraryID ){
    return( dao.read( libraryID ) );
  },
  update: function( libraryID, userID, link, name ){
    return( dao.create( libraryID, userID, link, name ) );
  },
  delete: function( libraryID, userID ){
    return( dao.delete( libraryID, userID ) );
  }
};
