import mysql from 'mariadb';

const pool = mysql.createPool({
  connectionLimit : 50,
  host            : 'localhost', // your db host
  user            : '<user>', // your db user
  password        : '<pwd>', // your db password
  database        : 'laceside' // your database name for laceside
});

export var dbConfig = {
  pool: pool
};
