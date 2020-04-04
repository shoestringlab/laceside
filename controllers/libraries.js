
const service = require( '../model/librariesservice' );
const appLibraryService = require( '../model/applibrariesservice' );

module.exports = {

   getLibraries: function( request, response ){
    service.getLibraries( request.user.userID )
      .then( function( results ){
        response.setHeader( "Cache-Control", "no-cache" );
        response.send( JSON.stringify( results) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  getByUserID: function( request, response ){
   service.getLibraries( request.params.ID )
     .then( function( results ){
       response.setHeader( "Cache-Control", "no-cache" );
       response.send( JSON.stringify( results) );
     })
     .catch( function( error ){
       console.log( error );
       response.send( JSON.stringify( error ) );
     });
 },

  create: function( request, response){
    service.create( request.body.libraryID, request.user.userID, request.body.link, request.body.name )
      .then( function( results ){
        //we are reading back the inserted row
        service.read( results )
          .then( function( library ){
            response.send( JSON.stringify( library ) );
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
    //response.send( JSON.stringify( request.body ) );
     service.update( request.params.ID, request.user.userID, request.body.link, request.body.name  )
      .then( function( results ){
        //we are reading back the updated row
        service.read( request.params.ID )
          .then( function( library ){
            response.send( JSON.stringify( library ) );
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
    appLibraryService.deleteByLibraryID( request.params.ID, request.user.userID )
      .then( function( success ){
        service.delete( request.params.ID, request.user.userID )
          .then( function( success ){
            response.send( JSON.stringify( success ) );
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
