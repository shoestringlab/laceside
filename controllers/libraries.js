
const service = require( '../model/librariesservice' );

module.exports = {

   getLibraries: function( request, response ){
    service.getLibraries( request.user.userID, 20, parseInt( request.query.offset, 10 ) )
      .then( function( results ){
        console.log( results );
        response.send( JSON.stringify( { records: results[0], total: results[1][0].totalPosts } ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  },

  create: function( request, response){
    service.create( request.user.userID, request.body.link, request.body.name )
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
     service.update( request.body.libraryID, request.user.userID, request.body.link, request.body.name  )
      .then( function( results ){
        //we are reading back the updated row
        service.read( request.body.taskID )
          .then( function( task ){
            response.send( JSON.stringify( task ) );
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
    service.delete( request.params.libraryID, request.user.userID )
      .then( function( success ){
        response.send( JSON.stringify( success ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  }
}
