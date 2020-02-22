const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const appcontroller = require( "../controllers/apps.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get libraries for a user
  app.get( "/apps", appcontroller.getApps );

  // create a new library
  app.post( "/app", jsonParser, appcontroller.create );

  // get a library by ID
  app.get( "/app/:ID", appcontroller.read );

  // update a library
  app.put( "/app/:ID", jsonParser, appcontroller.update );

  //delete a library
  app.delete( "/app/:ID", appcontroller.delete );

};
