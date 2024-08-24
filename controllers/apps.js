
import {appsservice as service}  from '../model/appsservice.js';
import {applibrariesservice} from '../model/applibrariesservice.js';

export var apps = {

   getApps: function( request, response ){
    service.getApps( request.user.userID )
      .then( function( results ){
        applibrariesservice.getByUserID( request.user.userID )
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

  getByUserID: function( request, response ){
   service.getApps( request.params.ID )
     .then( function( results ){
		applibrariesservice.getByUserID( request.params.ID )
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
    service.create( request.body.appID, request.user.userID, request.body.name, request.body.jsCode, request.body.htmlCode, request.body.cssCode, request.body.esModule, request.body.libraries )
      .then( function( results ){
        service.read( request.body.appID )
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
    applibrariesservice.deleteByAppID( request.params.ID, request.user.userID )
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
