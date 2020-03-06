
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
app.use( "/lib/velocity", express.static( 'node_modules/velocity-animate' ) );
app.use( "/lib/url-router", express.static( 'node_modules/url-router' ) );
app.use( "/upload", express.static( 'upload' ) );

app.use( httpinterceptor.checkHTTPAuth );

// routes for the API
require( './routes/api.apps.js' )(app);
require( './routes/api.auth.js' )(app);
require( './routes/api.files.js' )(app);
require( './routes/api.libraries.js' )(app);
require( './routes/api.userprofiles.js' )(app);
require( './routes/api.users.js' )(app);

app.use( "*", express.static( '/index.html' ) );

/*
// default route
app.get('*',function (req, res) {
    res.redirect('/index.html');
}); */

// set our listener
var server = app.listen( 4100, function(){

});
