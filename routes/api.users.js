const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const appcontroller = require( "../controllers/apps.js" );
  const usercontroller = require( "../controllers/users.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get all users
  app.get( "/api/users", usercontroller.getAll );

  // get a user by ID
  app.get( "/api/user/username/:username", usercontroller.getByUsername );

  // create a new user
  app.post( "/api/user", jsonParser, usercontroller.create );

  // get apps by userID
  app.get( "/api/user/:ID/apps", appcontroller.getByUserID );

  // get a user by ID
  app.get( "/api/user/:ID", usercontroller.read );

  //update a user
  app.put( "/api/user", jsonParser, usercontroller.update );

  //delete a user
//  app.delete( "/api/user/:ID", usercontroller.delete );

};
