import {dbConfig} from "../config/dbconfig.js";

const pool = dbConfig.pool;

export var passwordresetgateway = (function(){
  return{
    getUserByResetID: function( resetID ){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query(`SELECT u.userID
                              FROM users u
                              JOIN passwordReset pr ON u.emailAddress = pr.emailAddress
                              WHERE pr.resetID = ? and pr.expires > curdate()`, [resetID])
              .then( ( results ) =>{
                connection.end();
                resolve( results[0] );
              })
              .catch( err =>{
                //not connected
                connection.end();
                reject( err );
              });
          })
          .catch( err => {
            //not connected
            reject( err );
          });
      });
    }
  };
  })();
