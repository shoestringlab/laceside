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
  delete: function( libraryID ){
    return( dao.delete( libraryID ) );
  }
};
