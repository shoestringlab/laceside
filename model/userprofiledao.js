const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return dao;
}

var dao = {
  create: function ( userID, profilePic ){

    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('INSERT INTO userprofile ( userID, profilePic ) VALUES ( ?, ? )',
            [userID, profilePic] )
            .then( ( results ) => {
              connection.end();
              resolve( userID );
            })
            .catch( err => {
              connection.end();
              reject( error );
            });
        })
        .catch( err => {
          //not connected
          reject( err );
        });
    });
  },

  read: function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query(`SELECT userID, profilePic
                            FROM userProfile
                            WHERE userID = ?`,
            [userID] )
          .then( ( results ) => {
            connection.end();
            resolve( results[0] );
          })
          .catch( err => {
            connection.end();
            reject( err );
          });
        })
        .catch( err => {
          reject( err );
        });
    });
  },

  update: function( userID, profilePic ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('UPDATE userProfile SET profilePic = ? WHERE userID = ?',
            [ profilePic, userID ] )
            .then( ( results ) => {
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

  delete: function( userID ){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
        .then( connection => {
          connection.query('DELETE FROM userprofile WHERE userID = ?', [userID] )
            .then( ( results ) => {
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
