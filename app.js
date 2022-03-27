const express = require('express');                                                                                               // require the express frame work 
const dotenv = require('dotenv');                                                                                                 // require the dotenv to load config variables

// Load config
dotenv.config({path: './config/config.env'});

const connectDB = require('./models/Database/db.js');                                                                                     // import the mongo database connection 
connectDB();                                                                                                                       // call the Db connection

const app = express();                                                                                                             // call the express frame work object on the app const.

const HTML_PATH = __dirname + '/views/pages/';

app.use(express.static(HTML_PATH));
app.use(express.static(__dirname + '/views/'));

const path = require('path');                                                                                                       // Require the system path 

     
// // @ routes Adding the routes for the Express frame work to serve.
// // Index Page Endpoint
// app.get('/index', function(req, res) {
//     res.sendFile(path.join(HTML_PATH + 'index.html'));
// });

// // // Customers Page Endpoint
// // app.get('/customers', function(req, res) {
// //     res.sendFile(path.join(HTML_PATH + 'customers.html'));
// // });

// // Employees Page Endpoint
// app.get('/employees', function(req, res) {
//     res.sendFile(path.join(HTML_PATH + 'employees.html'));
// });

// // Inventory Page Endpoint
// app.get('/inventory', function(req, res) {
//     res.sendFile(path.join(HTML_PATH + 'inventory.html'));
// });

// // Products Page Endpoint
// app.get('/products', function(req, res) {
//     res.sendFile(path.join(HTML_PATH + 'products.html'));
// });

// // Suppliers Page Endpoint
// app.get('/suppliers', function(req, res) {
//     res.sendFile(path.join(HTML_PATH + 'suppliers.html'));
// });

// Routes
// app.use('/', require('./routes/index'));


// app.use('/customers', require('./routes/customers'))
app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 3000;                                                                                             // set the port number from the config variable 
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));                                   // set the server listener to listen on port variable.
