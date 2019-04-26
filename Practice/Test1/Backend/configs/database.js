const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ta_280332',
    database: 'workshop',
    charset: 'utf8'
});

module.exports = connection;