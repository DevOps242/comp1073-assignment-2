const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Require the database schemas
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');


//@ desc    Customer
//@ route   GET /customer
router.get('/read', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
        
    } catch (error) {
        console.error(error);
        console.log(error);
    }
})

router.get('/read/:id', async (req, res) => {
    try {
        const id = req.params.id.substring(1);

        const customer = await Customer.findById(id);
        res.status(200).json(customer);

    } catch (error) {
        console.error(error);
        console.log(error);
    }
})

//@ desc    Customer
//@ route   POST /create_customer
router.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        // Create a new array of obejct using destructor 
        let newReq = [req.body];    
        
        // Create a key value pair with the date in the object.
        newReq[0]['createdAt'] = Date.now();                                        
       
        // Update the information to the database
        let response = await Customer.create(newReq)
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
//@ route   Update /customer
router.put('/update/:id', async (req, res, next) => {
    try {
        console.log(req.params.id);
        
        Customer.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            (error, data) => {
                if (error) {
                    console.log(error);
                    return res.send(500, {error:error})  
                } else {
                    res.status(200).send(data)
                    console.log('Data updated successfully');
                }
            }
        )
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
        console.log(error);
    }
})


//@ desc    Customer
//@ route   Delete /customer
router.post('/delete:id', async (req, res) => {
    try {
        console.log(req.body);
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