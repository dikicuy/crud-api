const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'crud_api',
    user: 'postgres',
    password: 'diki123'
});

module.exports = db;