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
//@ route   POST /create_customer
router.post('/create_customers/', async (req, res) => {
    try {
        let newReq = [...req.body];                                                 // Create a new array of obejct using destructor                              
        newReq[0]['createdAt'] = Date.now();                                        // Create a key value pair with the date in the object.
        
        let response = await Customer.create(req.body)
        .then((response) => {
            console.log(response);
        })
        res.status(200).send(response)
    
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
        console.log(error);
    }
})

//@ desc    Customer
//@ route   Delete /customer
router.post('/delete_customers/', async (req, res) => {
    try {
        const response = await Customer.deleteOne({_id : req.body[0]['customerId']})
        .then((response) => {
            console.log(response);
        })
        res.status(200).send(response);
        console.log(req.body)

    } catch (error) {
        res.status(500).send(error);
        console.error(error);
        console.log(error);
    }
})

module.exports = router