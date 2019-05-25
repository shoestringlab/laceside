const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

var dao = {
  create: function ( userID, link, name ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`INSERT INTO libraries ( userID, link, name )
                            VALUES ( ?, ?, ? )`, [ userID, link, name] )
            .then( ( results ) =>{
              connection.end();
              resolve( results.insertId );
            })
            .catch( err =>{
              connection.end();
              reject( err );
            });
        })
        .catch( err =>{
          reject( err );
        });
    });
  },

  read: function( libraryID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection =>{
          connection.query(`SELECT *
                            FROM libraries
                            WHERE libraryID = ?`, [libraryID] )
            .then( ( results ) =>{
              connection.end();
              resolve( results[0] );
            })
            .catch( err =>{
              connection.end();
              reject( err );
            });
        })
        .catch( err =>{
          reject( err );
        });
    });
  },
  update: function ( libraryID, userID, link, name ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`UPDATE libraries
                            SET link = ?,
                                name = ?
                            WHERE libraryID = ?
                            AND   userID = ?`, [ link, name, libraryID, userID ] )
            .then( ( results ) =>{
              connection.end();
              resolve( true );
            })
            .catch( err =>{
              connection.end();
              reject( err );
            });
        })
        .catch( err =>{
          reject( err );
        });
    });
  },

  delete: function( libraryID, userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
        connection.query(`DELETE FROM libraries
                          WHERE libraryID = ?
                          AND userID = ?`, [libraryID, userID])
          .then( ( results ) =>{
            connection.end();
            resolve( true ); // successful delete
          })
          .catch( err =>{
            connection.end();
            reject( err );
          });
        })
        .catch( err =>{
          reject( err );
        });
    });
  }
};
