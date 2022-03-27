const express = require('express');
const router = express.Router();

// Require the database schemas
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');


//@ desc    Customer
//@ route   GET /customer
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
        // res.status().json('customers', {
        //     customers
        // })
    } catch (error) {
        console.error(error);
        console.log(error);
    }
})

//@ desc    Customer
//@ route   ADD /customer
router.post('/customers/add', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
        // res.status().json('customers', {
        //     customers
        // })
    } catch (error) {
        console.error(error);
        console.log(error);
    }
})

module.exports = router