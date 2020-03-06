const interceptor = require( '../interceptors/httpinterceptor.js' );

module.exports = function(app) {
  const filecontroller = require( "../controllers/files.js" );
  const bodyParser = require('body-parser');

  let options = {
    inflate: true,
    limit: '1024kb',
    type: 'application/octet-stream'
  };
  let rawParser = bodyParser.raw(options);

  // upload a file
  app.post( "/api/files", rawParser, filecontroller.upload );

};
