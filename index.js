
const express = require( 'express' );
const app = express();
const httpinterceptor = require( './interceptors/httpinterceptor.js' );

// map our client-side libraries
app.use( express.static( 'client' ) );
app.use( "/lib/altseven", express.static( 'node_modules/altseven' ) );
app.use( "/lib/codemirror", express.static( 'node_modules/codemirror' ) );
app.use( "/lib/cuid", express.static( 'node_modules/cuid' ) );
app.use( "/lib/feather-icons", express.static( 'node_modules/feather-icons' ) );
app.use( "/lib/gadget-ui", express.static( 'node_modules/gadget-ui' ) );
app.use( "/lib/modlazy", express.static( 'node_modules/modlazy' ) );

app.use( httpinterceptor.checkHTTPAuth );

// routes for the API
require( './routes/auth.js' )(app);
require( './routes/libraries.js' )(app);
require( './routes/users.js' )(app);

// set our listener
var server = app.listen( 4100, function(){

});
