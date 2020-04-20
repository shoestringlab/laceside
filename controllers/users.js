
const userservice = require( '../model/userservice' );
const utils = require( '../model/utils' );
const emailConfig = require( "../config/emailconfig.js" );
const siteConfig = require( "../config/siteconfig.js" );

function sendConfirmationMail( user, userConfirmationID ){
    let message = {};
    message.plainText = `Please confirm your email address.

           This email address has been signed up for an account at ${siteConfig.host}

           To confirm this account, please visit:

           ${siteConfig.userConfirmationURI + userConfirmationID}
          `;
    message.htmlText = `Dear ${user.firstName} ${user.lastName},
           <p>
           This email address has been signed up for an account at ${siteConfig.host}
           </p>
           <p>
           To confirm this account, please visit:
           </p>
           <p>
           ${siteConfig.userConfirmationURI + userConfirmationID}
           </p>
          `;
  let from = '"' + emailConfig.emailUser.name + '" ' + '<' + emailConfig.emailUser.emailaddress + '>';
  let to = user.emailAddress;
  let subject = 'LacesIDE - Please confirm you email address.';

  utils.sendEmail( to, from, subject, message )
    .catch( console.error);
}

module.exports = {

  getAll: function( request, response ){
    userservice.getAll()
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  getByUsername: function( request, response ){
    userservice.getByUsername( request.params.username )
      .then( function( results ){

        if( request.query.returnType !== undefined && request.query.returnType === 'boolean' ){
          response.send( JSON.stringify( results.length ) );
        }else{
          let user = results[0];
          // remove the hash from the token so we don't send it outside the system
          delete user.hash;
          response.send( JSON.stringify( user ) );
        }
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  getEmailAddress: function( request, response ){
    userservice.getEmailAddress( request.params.emailAddress )
      .then( function( results ){
        let exists = results.length;
        response.send( JSON.stringify( exists ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  create: function( request, response){
    userservice.create( request.params.ID, request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.nickName, request.body.emailAddress )
      .then( function( results ){
        // email the user

        //we are reading back the inserted row
        userservice.read( results.userID )
          .then( function( user ){
            sendConfirmationMail( user, results.userConfirmationID );

            response.send( JSON.stringify( user ) );
          })
          .catch( function( error ){
            console.log( error );
            response.send( JSON.stringify( error ) );
          });
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  read: function( request, response){
    userservice.read( request.params.ID )
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  update: function( request, response){
     userservice.update( request.params.ID, request.body.firstName, request.body.lastName, request.body.nickName, request.body.emailAddress )
      .then( function( user ){
        //we are reading back the updated row
        userservice.read( request.params.ID )
          .then( function( user ){
            response.send( JSON.stringify( user ) );
          })
          .catch( function( error ){
            console.log( error );
            response.send( JSON.stringify( error ) );
          });
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  delete: function( request, response){
    userservice.delete( request.params.ID )
      .then( function( success ){
        response.send( JSON.stringify( success ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },
  confirmUser: function( request, response ){
    userservice.confirmUser( request.params.ID )
      .then( function( success ){
        response.send( JSON.stringify( success ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  }
};
