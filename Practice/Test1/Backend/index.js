const express = require('express');
const server = express();
const expressSession = require('express-session');
const bodyParser = require("body-parser");
const PORT = 3000;

// System Session
server.use(expressSession({
    secret: 'workshop',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));


// Setting parser in case of client send data
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Custom Function
server.use(require('./configs/middleware'));

// For Router
server.use('/api', require('./routes'));

server.get('*', function(request, response) {
    response.end(`<h1>Backend Server is started.</h1>`)
});

server.listen(PORT, () => console.log(`Server is started, Port ${PORT}.`))

