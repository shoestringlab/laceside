
const service = require( '../model/appsservice' );
const appLibraryService = require( '../model/applibrariesservice' );

module.exports = {

   getApps: function( request, response ){
    service.getApps( request.user.userID )
      .then( function( results ){
        appLibraryService.getByUserID( request.user.userID )
          .then( function( alResults ){
              results.forEach( function( result ){
              // find the libraries used for each app
              let libs = alResults.filter( lib => lib.appID === result.appID ).map( lib => lib.libraryID ).join(",");
              result.libraries = libs;
            });
            response.setHeader( "Cache-Control", "no-cache" );
            response.send( JSON.stringify( results ) );
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

  create: function( request, response){
    service.create( request.user.userID, request.body.name, request.body.jsCode, request.body.htmlCode, request.body.cssCode, request.body.esModule, request.body.libraries )
      .then( function( results ){
        service.read( results )
          .then( function( app ){
            response.send( JSON.stringify( app ) );
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
    service.read( request.params.ID )
      .then( function( results ){
        response.send( JSON.stringify( results ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

   update: function( request, response){
     service.update( request.params.ID, request.user.userID, request.body.name, request.body.jsCode, request.body.htmlCode, request.body.cssCode, request.body.esModule, request.body.libraries )
      .then( function( results ){
        //we are reading back the updated row
        service.read( request.params.ID )
          .then( function( app ){
            response.send( JSON.stringify( app ) );
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
    appLibraryService.deleteByAppID( request.params.ID, request.user.userID )
      .then( function( success ){
        service.delete( request.params.ID, request.user.userID )
          .then( function( results ){
            response.send( JSON.stringify( results ) );
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
  }
};
