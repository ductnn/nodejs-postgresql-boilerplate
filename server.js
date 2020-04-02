require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = new express();

// ROUTES
const userRoute = require('./routes/user.route');

app.use('/static', express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Ductn'
    });
});

app.use('/users', userRoute);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});