const interceptor = require( '../interceptors/httpinterceptor.js' );
const bodyParser = require('body-parser');

module.exports = function(app) {
  const userprofilecontroller = require( "../controllers/userprofiles.js" );

  var jsonParser = bodyParser.json();

  //update a user profile
  app.put( "/userprofile/:ID", jsonParser, userprofilecontroller.update );

};
