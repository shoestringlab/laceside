import {dbConfig} from "../config/dbconfig.js";
import bcrypt from 'bcryptjs';

const pool = dbConfig.pool;

export var userconfirmationdao = (function() {
  return{
    // create is not used currently
    create: function ( userConfirmationID, userID ){

      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
              connection.query('INSERT INTO userConfirmation ( userConfirmationID, userID ) VALUES ( ?, ? )',
                [userConfirmationID,userID] )
                .then( ( results ) => {
                  //
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

    read: function( userConfirmationID ){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query(`SELECT userConfirmationID, userID, confirmed, confirmedDate
                                WHERE userConfirmationID = ?`,
              [userConfirmationID] )
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

    update: function( userConfirmationID ){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query('UPDATE userConfirmation SET confirmedDate = ?, confirmed = 1 WHERE userConfirmationID = ?',
              [ curdate(), userConfirmationID ] )
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

    delete: function( userConfirmationID ){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query('DELETE FROM userConfirmation WHERE userConfirmationID = ?', [userConfirmationID] )
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
  
})();
