const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    
    customerName: {
        type: String, 
        required: true
    }, 
    customerRepName: {
        type: String, 
        required: true
    }, 
    customerPhoneNumber: {
        type: String, 
        required: true
    },
    customerAddress: {
        type: String, 
        required: true
    }, 
    customerCountry: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    }
}, {
    collection: 'customers'
})

module.exports = mongoose.model('Customers', CustomerSchema );

