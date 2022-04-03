const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    supplierName: {
        type: String, 
        required: true
    }, 
    supplierAddress: {
        type: String, 
        required: true
    }, 
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    employee: {type: mongoose.Schema.Types.ObjectId, ref: 'employees'}, 
    supplierPhoneNumber: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
        "collection" : "suppliers"
    }
)

module.exports = mongoose.model('Suppliers', SupplierSchema );