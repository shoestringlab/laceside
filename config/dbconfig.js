
const mysql = require( 'mariadb' );

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost',
  user            : 'laceside',
  password        : 'pwdLIDE@',
  database        : 'laceside'
});

module.exports = {
  pool: pool
};
