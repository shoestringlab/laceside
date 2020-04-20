const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const appcontroller = require( "../controllers/apps.js" );
  const librarycontroller = require( "../controllers/libraries.js" );
  const usercontroller = require( "../controllers/users.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // create a new user
  app.post( "/api/user/:ID", jsonParser, usercontroller.create );

  // get a user by ID
  app.get( "/api/user/:ID", usercontroller.read );

  //update a user
  app.put( "/api/user/:ID", jsonParser, usercontroller.update );

  //delete a user
  //  app.delete( "/api/user/:ID", usercontroller.delete );

  // get libraries for a user
  app.put( "/api/userconfirmation/:ID", usercontroller.confirmUser );

  // get all users
  app.get( "/api/users", usercontroller.getAll );

  // get a user by ID
  app.get( "/api/u/username/:username", usercontroller.getByUsername );

  // get apps by userID
  app.get( "/api/user/:ID/apps", appcontroller.getByUserID );

  // get libraries for a user
  app.get( "/api/user/:ID/libraries", librarycontroller.getByUserID );

  // check if an email address is in the system
  app.get( "/api/email/:emailAddress", usercontroller.getEmailAddress );


};
