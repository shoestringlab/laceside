const appsdao = require( './appsdao' );
const appsgateway = require( './appsgateway' );

const dao = appsdao();
const gateway = appsgateway();

module.exports = {
   getApps: function( userID, count, offset ){
    return( gateway.getApps( userID, count, offset ) );
  },
  create: function( userID, name, jsCode, htmlCode, cssCode, esModule, libraries ){
    return( dao.create( userID, name, jsCode, htmlCode, cssCode, esModule, libraries ) );
  },
  read: function( appID ){
    return( dao.read( appID ) );
  },
  update: function( appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries ){
    return( dao.update( appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries ) );
  },
  delete: function( appID, userID ){
    return( dao.delete( appID, userID ) );
  }
};
