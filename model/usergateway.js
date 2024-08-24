import {dbConfig} from "../config/dbconfig.js";
import bcrypt from 'bcryptjs';

const pool = dbConfig.pool;

export var usergateway = (function(){
  return{
    getAll : function(){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
        .then( connection => {
          connection.query('SELECT userID, username, hash, firstName, lastName, nickName, emailAddress from users ORDER BY userID' )
            .then( ( results ) =>{
              connection.end();
              resolve( results );
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
    getByUsername : function( username ){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query(`SELECT u.userID, u.username, u.hash, u.firstName, u.lastName, u.dateCreated, u.nickName, u.emailAddress, up.profilePic
                              FROM users u
                              JOIN userProfile up on u.userID = up.userID
                              WHERE u.username = ?`, [ username ] )
              .then( ( results ) =>{
                connection.end();
                resolve( results );
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
    getEmailAddress : function( emailAddress ){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query(`SELECT userID
                              FROM users
                              WHERE emailAddress = ?`, [ emailAddress ] )
              .then( ( results ) =>{
                connection.end();
                resolve( results );
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
    changePassword: function( userID, password ){
      let salt = bcrypt.genSaltSync( 10 );
      let hash = bcrypt.hashSync( password, salt );
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query(`UPDATE  users
                              SET     hash = ?
                              WHERE   userID = ?`, [ hash, userID ] )
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
    confirmUser: function( userConfirmationID ){
      return new Promise( function( resolve, reject ){
        pool.getConnection()
          .then( connection => {
            connection.query(`UPDATE users, userConfirmation SET users.disabled = 0, userConfirmation.confirmed = 1, userConfirmation.confirmedDate = curdate()
                              WHERE   users.userID = userConfirmation.userID
                              AND userConfirmation.userConfirmationID = ?`, [userConfirmationID] )
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
