const applibrariesdao = require( './applibrariesdao' );
const applibrariesgateway = require( './applibrariesgateway' );

const dao = applibrariesdao();
const gateway = applibrariesgateway();

module.exports = {
  getByAppID: function( appID ){
    return( gateway.getByAppID( appID ) );
  },
  getByUserID: function( userID ){
    return gateway.getByUserID( userID );
  },
  deleteByAppID: function( appID, userID ){
    return gateway.deleteByAppID( appID, userID );
  },
  deleteByLibraryID: function( libraryID, userID ){
    return gateway.deleteByLibraryID( libraryID, userID );
  },
  createMany: function( appID, libraries ){
    return( dao.create( appID, libraries ) );
  },
  create: function( appID, libraryID ){
    return( dao.create( appID, libraryID ) );
  },
  delete: function( appID, libraryID ){
    return( dao.delete( appID, libraryID ) );
  }
};
