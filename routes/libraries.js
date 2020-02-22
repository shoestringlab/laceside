const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const librarycontroller = require( "../controllers/libraries.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get libraries for a user
  app.get( "/libraries", librarycontroller.getLibraries );

  // create a new library
  app.post( "/library", jsonParser, librarycontroller.create );

  // get a library by ID
  app.get( "/library/:ID", librarycontroller.read );

  // update a library
  app.put( "/library/:ID", jsonParser, librarycontroller.update );

  //delete a library
  app.delete( "/library/:ID", librarycontroller.delete );

};
