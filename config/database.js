const Promise = require('promise');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const db = new pg({
    connectionString: connectionString
})

module.exports = db;