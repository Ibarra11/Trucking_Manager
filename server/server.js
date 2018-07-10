const
    express = require('express'),
    app = express(),
    massive = require('massive'),
    session = require('express-session'),
    ctrl = require('./controller'),
    bcrypt = require('bcrypt-nodejs'),
    bodyParser = require('body-parser');
require('dotenv').config();


const {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING
} = process.env;

// Middleware
app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// Database Setup
massive(CONNECTION_STRING)
    .then(db => {
        console.log('db connected');
        app.set('db', db);
    })
    .catch(err => console.log(err));



// endpoints

app.post('/api/auth/register', (req, res) => ctrl.registerUser(req,res, bcrypt))

app.post('/api/auth/login', (req,res) => ctrl.findUser(req, res, bcrypt))



app.listen(SERVER_PORT, () => console.log('server running'));

