import {passwordresetdao as dao} from './passwordresetdao.js';
import {passwordresetgateway as gateway} from './passwordresetgateway.js';

//const dao = passwordresetdao();
//const gateway = passwordresetgateway();

export var passwordresetservice = (function(){
  return{
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
})();
