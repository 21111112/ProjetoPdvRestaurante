const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'databaseprojeto',
  password: 'postgre',
  port: 5433,
});

module.exports = pool;
