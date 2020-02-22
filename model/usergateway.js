const dbConfig = require( "../config/dbconfig.js" );

module.exports = init;

const pool = dbConfig.pool;

function init(){
  return gateway;
}

gateway = {
  getAll : function(){
    return new Promise( function( resolve, reject ){
      pool.getConnection()
      .then( connection => {
        connection.query('SELECT userID, username, hash, firstName, lastName, nickName from users ORDER BY userID' )
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
          connection.query(`SELECT u.userID, u.username, u.hash, u.firstName, u.lastName, u.dateCreated, u.nickName, up.profilePic
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
  }
}
