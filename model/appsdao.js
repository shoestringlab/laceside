const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

var dao = {
  create: function ( userID, name, jsCode, htmlCode, cssCode, esModule, libraries ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`INSERT INTO apps ( userID, name, jsCode, htmlCode, cssCode, esModule )
                            VALUES ( ?, ?, ?, ?, ?, ? )`, [ userID, name, jsCode, htmlCode, cssCode, esModule] )
            .then( ( results ) =>{
              try{
                if( libraries.length ){
                  let libs = libraries.split(",");
                  for( var ix = 0; ix < libs.length; ix++ ){
                    if( ix < libs.length - 1 ){
                      connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                        VALUES ( ?, ? )`, [ results.insertId, libs[ ix ] ] );
                    }else{
                      connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                        VALUES ( ?, ? )`, [ results.insertId, libs[ ix ] ], (err) => {
                        //must handle error if any
                        connection.commit();
                      });
                    }
                  }
                }
              }catch (err) {
                connection.rollback();
                connection.end();
                reject( err );
              }
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

  read: function( appID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection =>{
          connection.query(`SELECT appID, name, jsCode, cssCode, htmlCode, esModule, userID
                            FROM apps
                            WHERE appID = ?`, [appID] )
            .then( ( results ) =>{
              connection.query( `SELECT libraryID
                                  FROM appLibraries
                                  WHERE appID = ?`, [appID] )
              .then( ( nextResults ) => {
                results[0].libraries = nextResults.map( lib => lib.libraryID ).join( "," );
                connection.end();
                resolve( results[0] );
              })
              .catch( err =>{
                connection.end();
                reject( err );
              });
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
  update: function ( appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`UPDATE apps
                            SET   name = ?,
                                  jsCode = ?,
                                  htmlCode = ?,
                                  cssCode = ?,
                                  esModule = ?
                            WHERE   appID = ?
                            AND     userID = ?`, [ name, jsCode, htmlCode, cssCode, esModule, appID, userID ] )
            .then( ( results ) =>{
              connection.query( `DELETE FROM appLibraries
                                  WHERE appID = ? `, [ appID ] )
                .then( ( deletedResults ) =>{
                  try{
                    if( libraries.length ){
                      let libs = libraries.split(",");
                      for( var ix = 0; ix < libs.length; ix++ ){
                        if( ix < libs.length - 1 ){
                          connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                            VALUES ( ?, ? )`, [ appID, libs[ ix ] ] );
                          connection.commit();
                        }else{
                          connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                            VALUES ( ?, ? )`, [ appID, libs[ ix ] ], (err) => {
                            //must handle error if any
                            connection.commit();
                          });
                        }
                      }
                    }
                  }catch (err) {
                    connection.rollback();
                    connection.end();
                    reject( err );
                  }
                  connection.end();
                  resolve( true );
                })
                .catch( err =>{
                  connection.end();
                  reject( err );
                });
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
  delete: function( appID, userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
        connection.query(`DELETE FROM apps
                          WHERE appID = ?
                          AND userID = ?`, [appID, userID])
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
