
import express from 'express';
import {interceptor} from './interceptors/httpinterceptor.js';

const app = express();

/* 	If you want to run this app without a web server front end,
	map you static libraries here.

	Libraries in /node_modules/ should be mapped to /lib/<libaryName>
*/

app.use( interceptor.checkHTTPAuth );

// routes for the API
import {apps} from './routes/api.apps.js';
import {auth} from './routes/api.auth.js';
import {files} from './routes/api.files.js';
import {applibraries} from './routes/api.applibraries.js';
import {libraries} from './routes/api.libraries.js';
import {users} from './routes/api.users.js';

//init routes
auth.init( app );
apps.init( app );
files.init( app );
applibraries.init( app );
libraries.init( app );
users.init( app );

// default route
app.get('/u/:username',function (req, res) {
    res.sendFile('index.html', {root: 'client'});
});

// default route
app.get('*',function (req, res) {
    res.sendFile('index.html', {root: 'client'});
});

// set our listener
var server = app.listen( 4100, function(){

});
