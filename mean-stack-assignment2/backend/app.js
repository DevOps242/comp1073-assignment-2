const express = require('express');                                                                                               // require the express frame work 
const dotenv = require('dotenv');                                                                                                 // require the dotenv to load config variables

// Load config
dotenv.config({path: './config/config.env'});

const connectDB = require('./models/Database/db.js');                                                                              // import the mongo database connection 
connectDB();                                                                                                                       // call the Db connection

const app = express();                                                                                                             // call the express frame work object on the app const.
app.use(express.urlencoded({extended:false }))                                                                                     // to allow the express server to accept data
app.use(express.json())                                                                                                            // allow express server to accept json requests

const HTML_PATH = __dirname + '/views/pages/';

app.use(express.static(HTML_PATH));
app.use(express.static(__dirname + '/views/'));

const path = require('path');       

// Allow cross site origin
const cors = require('cors');
app.use(cors());

// Routes
// app.use('/', require('./routes/index'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/products', require('./routes/products'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/inventory', require('./routes/inventory'));

// in NodeJS/Express (server)
app.all('/api/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
    next();
});

const PORT = process.env.PORT || 4000;                                                                                             // set the port number from the config variable 
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));                                   // set the server listener to listen on port variable.
