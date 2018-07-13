const
    express = require('express'),
    app = express(),
    massive = require('massive'),
    session = require('express-session'),
    ctrl = require('./controller'),
    bcrypt = require('bcrypt-nodejs'),
    bodyParser = require('body-parser'),
    validator = require('express-validator');
require('dotenv').config();


const {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING
} = process.env;

// Middleware
app.use(bodyParser.json());
// save uninitalizaed to false maeks it so that we dont make a cookie for anyone that visits the site
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(validator());

// Database Setup
massive(CONNECTION_STRING)
    .then(db => {
        console.log('db connected');
        app.set('db', db);
    })
    .catch(err => console.log(err));

// endpoints

app.post('/api/auth/register', (req, res) => ctrl.registerUser(req, res, bcrypt))

app.post('/api/auth/login', (req, res) => ctrl.findUser(req, res, bcrypt))

app.get('/api/drivers', ctrl.getAllDrivers);

app.post('/api/driver', ctrl.addDriver );

app.delete('/api/driver/:driver_id', ctrl.deleteDriver)

app.listen(SERVER_PORT, () => console.log('server running'));

