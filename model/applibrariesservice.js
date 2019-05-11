const applibrariesdao = require( './applibrariesdao' );
const applibrariesgateway = require( './applibrariesgateway' );

const dao = applibrariesdao();
const gateway = applibrariesgateway();

module.exports = {
  getByAppID: function( appID ){
    return( gateway.getByAppID( appID ) );
  },
  deleteByAppID: function( appID ){
    return gateway.deleteByAppID( appID );
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
