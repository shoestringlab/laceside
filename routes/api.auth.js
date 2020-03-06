
module.exports = function(app) {
  const authcontroller = require( "../controllers/auth.js" );
  const bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();

  // get a auth by ID
  app.post( "/api/auth/login", authcontroller.login );

  app.post( "/api/auth/logout", authcontroller.logout );

  app.get( "/api/auth/refresh", authcontroller.refresh );

};
