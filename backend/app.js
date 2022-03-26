
// require the express frame work 
const express = require('express');

// require the dotenv to load config variables
const dotenv = require('dotenv');

// Load config
dotenv.config({path: './config/config.env'});

// import the mongo database connection 
const connectDB = require('./Database/db.js');

// call the Db connection 
connectDB();

// call the express frame work object on the app const.
const app = express();

// set the port number from the config variable 
const PORT = process.env.PORT || 3000;

// set the server listener to listen on port variable.
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));




