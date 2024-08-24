import mysql from 'mariadb';

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost', // your db host
  user            : 'root', // your db user
  password        : '@2200feet', // your db password
  database        : 'laceside' // your database name for laceside
});

export var dbConfig = {
  pool: pool
};
