require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = new express();

// ROUTES
const indexRoute = require('./routes/index.route');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.json({ info: 'NodeJS + API + PostgresSQL'});
});

app.use('/users', indexRoute);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});