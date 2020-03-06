const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const librarycontroller = require( "../controllers/libraries.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get libraries for a user
  app.get( "/api/libraries", librarycontroller.getLibraries );

  // create a new library
  app.post( "/api/library", jsonParser, librarycontroller.create );

  // get a library by ID
  app.get( "/api/library/:ID", librarycontroller.read );

  // update a library
  app.put( "/api/library/:ID", jsonParser, librarycontroller.update );

  //delete a library
  app.delete( "/api/library/:ID", librarycontroller.delete );

};
