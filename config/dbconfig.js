
var mysql = require( 'mariadb' );

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost',
  user            : 'livesandbox',
  password        : '#iwsd*rsh',
  database        : 'livesandbox'
});

module.exports = {
  pool: pool
};
