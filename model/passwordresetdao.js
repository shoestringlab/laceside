const dbConfig = require( "../config/dbconfig.js" );
const cuid = require( '../libs/cuid' );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

let dao = {
  create: function( emailAddress ){
    let id = cuid();
    let expires = new Date();
    expires.setTime( expires.getTime() + ( 60 * 60 * 1000 ) );
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`INSERT INTO passwordReset( emailAddress, resetID, expires )
                            VALUES( ?, ?, ? )`, [ emailAddress, id, expires ] )
            .then( ( results ) =>{
              connection.end();
              resolve( id );
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
  read: function( resetID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`SELECT emailAddress, resetID, expires
                            FROM passwordReset
                            WHERE resetID = ?`, [ resetID ] )
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
  update: function( resetID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`UPDATE passwordReset
                            SET expires = curdate()
                            WHERE resetID = ?`, [ resetID ] )
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
  }
};
