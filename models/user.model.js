const Pool = require('pg').Pool;

const userPool = new Pool({
  user: 'ductn',
  host: 'localhost',
  database: 'api',
  password: 'ductn',
  port: 5432,
});

module.exports = userPool;