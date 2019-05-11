
const service = require( '../model/appsservice' );
const appLibraryService = require( '../model/applibrariesservice' );

module.exports = {

   getApps: function( request, response ){
    service.getApps( request.user.userID, 100, parseInt( request.query.offset, 10 ) )
      .then( function( results ){
        let rows = [];
        results[0].forEach( function( result ){
          let row = {};
          if( !row.appID || ( row.appID && row.appID !== result.appID ) ){
            row.appID = result.appID;
            row.name = result.name;
            row.jsCode = result.jsCode;
            row.htmlCode = result.htmlCode;
            row.esModule = result.esModule;
            row.cssCode = result.cssCode;
            row.libraries = [result.libraryID];
          }else{
            row.libraries.push( result.libraryID );
          }
          rows.push( row );
        });
        response.send( JSON.stringify( { records: rows, total: results[1][0].totalCount } ) );
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
    service.delete( request.params.ID, request.user.userID )
      .then( function( success ){
        response.send( JSON.stringify( success ) );
      })
      .catch( function( error ){
        console.log( error );
        response.send( JSON.stringify( error ) );
      });
  }
}
