const userProfileService = require( '../model/userprofileservice' );
const fs = require('fs');

module.exports = {
  update: function( request, response ){
    let oldPic = request.user.profilePic;
    // update the user record with the new profile pic
    userProfileService.update( request.user.userID, request.body.profilePic )
      .then( function( success ){
        // delete the old profile pic from the system
        if( oldPic !== null && oldPic !== request.body.profilePic ){
          fs.unlink( "." + oldPic, function( err ){
            if( err ){
              console.log( err );
            }
          });
        }
        response.send( JSON.stringify( success ) );
      })
      .catch( function( error ){
        response.set( "Status-Code", 500 );
        response.send( error );
      });
  }
};
