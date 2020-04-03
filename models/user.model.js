const Pool = require('pg').Pool;

const userPool = new Pool({
  user: process.env.P_user,
  host: process.env.P_host,
  database: process.env.P_DB,
  password: process.env.P_pass,
  port: process.env.P_port,
});

module.exports = userPool;