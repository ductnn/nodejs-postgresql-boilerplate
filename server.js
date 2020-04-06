require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = new express();

// ROUTES
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

// API
const apiUserRoute = require('./api/routes/user.route');

app.use('/static', express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.CookieID));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Ductn'
    });
});

// use ROUTES
app.use('/users', userRoute);
app.use('/auth', authRoute);

// use API
app.use('/api/users', apiUserRoute);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});