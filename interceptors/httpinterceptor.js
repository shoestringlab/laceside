const securityconfig = require( "../config/securityconfig.js" );
const utils = require( '../model/utils' );
const userservice = require( '../model/userservice' );

function notAuthorized( request, response ){
  response.status( 401 );
  response.send( JSON.stringify( { error: "Not authorized." } ) );
}

module.exports = {
  checkHTTPAuth : function( request, response, next ){
    //console.log( "checkHTTPAuth: " + request.url );
    let openRoute;
    let securedRoute = securityconfig.routes.secured.find( function( route ){
      return request.url.match( route );
    });
    if( securedRoute !== undefined ){
      console.log( request.url + " matches " + securedRoute );
    }else{
      openRoute = securityconfig.routes.open.find( function( route ){
        return request.url.match( route );
      });
    }
    // check token
    //console.log( "Secured route check" );
    let token = request.headers[ "x-token" ];
    //console.log( "token: " + token );
    // anonymous access
    if( token === undefined || token.length === 0 ){
      if( securedRoute !== undefined ){
        // no anon access to secured routes
        notAuthorized( request, response );
        return;
      }else{
        if( openRoute === undefined ){
          console.log( "WARN: Route not found for URL:" + request.url );
        }
        // open routes pass through
        next();
      }
    }else{
      console.log( "token: " + token );
      let auth = utils.checkAuthToken( token, securityconfig.ttl );

      userservice.read( auth.userID )
        .then( function( results ){
          let user = results;

          let now = new Date();
          let valid = false;
          if( user.userID > 0 && new Date( auth.expires ).getTime() > now.getTime() ){
            valid = true;
            // remove the password hash from the token so we don't send it outside the system
            delete user.hash;
            //console.log( "checkHTTPAuth: user: " );
            //console.log( user );

            // this call sets a user into the request
            request.user = user;
            // set a new header token
            response.setHeader( "X-Token", utils.generateToken( user ) );
            // move on to the route handlers
            next();
          }else if( securedRoute !== undefined ){
            // denied
            //response.messages = "Authorization expired.";
            notAuthorized( request, response );
          }else{
            //catch-all - no valid user, but not a secured route
            if( openRoute === undefined ){
                console.log( "WARN: Route not found for URL:" + request.url );
            }
            // open routes pass through
            next();
          }
        })
        .catch( function( error ){
          console.log( error );
          response.status( 500 );
          response.send( "Error" );
        });
    }


    /* }else{

      if( openRoute === undefined ){
        console.log( "WARN: Route not found for URL:" + request.url );
      }

      //open routes pass through
      next();
    } */
  }
};
