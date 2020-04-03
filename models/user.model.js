const Pool = require('pg').Pool;

const userPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = userPool;