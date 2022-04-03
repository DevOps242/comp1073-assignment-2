const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Require the database schemas
const Inventory = require('../models/Inventory');

//@ desc    Inventory
//@ route   GET /customer
router.get('/read', async (req, res) => {
    try {
        const inventory = await Inventory.find({}).populate({path: 'product', 
            model: "Products" });
            
        res.status(200).json(inventory);
        
    } catch (error) {
        console.error(error);
        console.log(error);
    }
})

router.get('/read/:id', async (req, res) => {
    try {
        const id = req.params.id.substring(1);

        const inventory = await Inventory.findById(id);
        res.status(200).json(inventory);

    } catch (error) {
        console.error(error);
        console.log(error);
    }
})

//@ desc    Inventory
//@ route   POST /create_inventory
router.post('/create', async (req, res) => {
    try {
        // Create a new array of obejct using destructor 
        let newReq = [req.body];    
        
        // Create a key value pair with the date in the object.
        newReq[0]['createdAt'] = Date.now();  

        // Create the information in the database
        let response = await Inventory.create(newReq)
        
        inventory = await Inventory.findById(response[0]['_id'])
                           
        // const product = mongoose.Types.ObjectId();
        const product = mongoose.Types.ObjectId(newReq[0]['productId'])
        
        inventory.product = product
        inventory.save();
        console.log(inventory)

        res.status(200).send(inventory)
    
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
        console.log(error);
    }
})

//@ desc    Inventory
//@ route   Update /customer
router.put('/update/:id', async (req, res, next) => {
    try {    
        const product  = req.body['productId']
        req.body['product'] = product
        // delete the old key.
        delete req.body['productId']

        Inventory.findByIdAndUpdate(
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

//@ desc    Inventory
//@ route   Delete inventory
router.delete('/delete/:id', async (req, res) => {
    try {
       console.log(req.params.id);
        const response = await Inventory.deleteOne(
            {_id : req.params.id}
        )
        .then((response) => {
            console.log(response);
        })
        res.status(200).send(response);
        console.log(req.body)


        // if (response.deletedCount > 0){
        //     res.status(200).send(response);
        // } 
        // else {
        //     res.status(500).send(error);
        // }
        // console.log(response);
        
        // .then((response) => {
        //     console.log(response);
        // })
        
        console.log(req.body)
        return 0;

    } catch (error) {
        res.status(500).send(error);
        console.error(error);
        console.log(error);
    }
})

module.exports = router