const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return gateway;
}

gateway = {
  getLibraries : function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`SELECT libraryID, userID, name, link
                            FROM libraries
                            WHERE userID = ?
                            ORDER BY name`, [userID])
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
