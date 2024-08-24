
import express from 'express';
import {interceptor} from './interceptors/httpinterceptor.js';

const app = express();

// map our client-side libraries
app.use( express.static( 'client' ) );
app.use( "/lib/altseven", express.static( 'node_modules/altseven' ) );
app.use( "/lib/@codemirror", express.static( 'node_modules/@codemirror' ) );
app.use( "/lib/codemirror", express.static( 'node_modules/codemirror' ) );
app.use( "/lib/crelt", express.static( 'node_modules/crelt' ) );
app.use( "/lib/cuid", express.static( 'libs/cuid' ) );
app.use( "/lib/feather-icons", express.static( 'node_modules/feather-icons' ) );
app.use( "/lib/gadget-ui", express.static( 'node_modules/gadget-ui' ) );
app.use( "/lib/@lezer", express.static( 'node_modules/@lezer' ) );
app.use( "/lib/modlazy", express.static( 'node_modules/modlazy' ) );
app.use( "/lib/velocity", express.static( 'node_modules/velocity-animate' ) );
app.use( "/lib/url-router", express.static( 'node_modules/url-router' ) );
app.use( "/lib/style-mod", express.static( 'node_modules/style-mod' ) );
app.use( "/lib/w3c-keyname", express.static( 'node_modules/w3c-keyname' ) );
app.use( "/upload", express.static( 'upload' ) );

app.use( interceptor.checkHTTPAuth );

// routes for the API
import {apps} from './routes/api.apps.js';
import {auth} from './routes/api.auth.js';
import {files} from './routes/api.files.js';
import {libraries} from './routes/api.libraries.js';
import {userprofiles} from './routes/api.userprofiles.js';
import {users} from './routes/api.users.js';

//init routes
auth.init( app );
apps.init( app );
files.init( app );
libraries.init( app );
userprofiles.init( app );
users.init( app );

/* app.use( "*", express.static( '/index.html' ) );
 */

// default route
app.get('/u/:username',function (req, res) {
    res.sendFile('index.html', {root: 'client'});
});

// default route
app.get('*',function (req, res) {
    res.sendFile('index.html', {root: 'client'});
});

//app.use( "/(*)?", express.static( '/index.html' ) );

// set our listener
var server = app.listen( 4100, function(){

});
