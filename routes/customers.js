// const express = require('express');
// const router = express.Router();

// // Require the database schemas
// const Customer = require('../models/Customer');
// const Employee = require('../models/Employee');


// //@ desc    Customer
// //@ route   GET /customer
// router.get('/customers', async (req, res) => {
//     try {
//         const customers = await Customer.find();
//         console.log(customers);
//         res.render('customers', {
//             customers
//         })
//         console.log(customers);
//     } catch (error) {
//         console.error(error);
//         console.log(error);
//     }
// })

// module.exports = router