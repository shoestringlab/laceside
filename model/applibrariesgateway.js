const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return gateway;
}

gateway = {
  getByAppID : function( appID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`SELECT  libraryID
                            FROM    appLibraries
                            WHERE   appID = ? )`, [appID])
            .then( ( results ) =>{
              connection.end();
              resolve( results );
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
  },
  getByUserID : function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`SELECT  al.libraryID, al.appID
                            FROM    appLibraries al
                            JOIN    apps a ON al.appID = a.appID
                            WHERE   a.userID = ?`, [userID])
            .then( ( results ) =>{
              connection.end();
              resolve( results );
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
  },
  deleteByAppID : function( appID, userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`DELETE
                            FROM    appLibraries
                            WHERE   appID = ?
                            AND appID IN ( SELECT appID
                                            FROM  apps
                                            WHERE userID = ? )`, [ appID, userID ])
            .then( ( results ) =>{
              connection.end();
              resolve( results );
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
}
