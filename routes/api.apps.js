const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const appcontroller = require( "../controllers/apps.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // create a new app
  app.post( "/api/app", jsonParser, appcontroller.create );

  // get an app by ID
  app.get( "/api/app/:ID", appcontroller.read );

  // update an aop
  app.put( "/api/app/:ID", jsonParser, appcontroller.update );

  //delete an app
  app.delete( "/api/app/:ID", appcontroller.delete );

};
