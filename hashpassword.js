
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync( 10 );
var hash = bcrypt.hashSync( process.argv[0], salt );
console.log( hash );
