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
    supplierProduct: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'products'}
    },
    supplierRepName: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'employees'}
    }, 
    supplierPhoneNumber: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
        "collection" : "suppliers",
        supplierRepName: true,
        supplierProduct: true
    }
)

module.exports = mongoose.model('Suppliers', SupplierSchema );