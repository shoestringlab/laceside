
const mysql = require( 'mariadb' );

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost', // your db host
  user            : 'laceside', // your db user
  password        : 'password', // your db password
  database        : 'laceside' // your database name for laceside
});

module.exports = {
  pool: pool
};
