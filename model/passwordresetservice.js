const passwordresetdao = require( './passwordresetdao' );
const passwordresetgateway = require( './passwordresetgateway' );

const dao = passwordresetdao();
const gateway = passwordresetgateway();

module.exports = {
  create: function( emailAddress ){
    return( dao.create( emailAddress ) );
  },
  read: function( resetID ){
    return( dao.read( resetID ) );
  },
  update: function( resetID ){
    return( dao.update( resetID ) );
  },
  getUserByResetID: function( resetID ){
    return( gateway.getUserByResetID( resetID ) );
  }
};
