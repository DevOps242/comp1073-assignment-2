const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String, 
        required: true
    }, 
    productDescription: {
        type: String, 
        required: true
    }, 
    productUnitPrice: {
        type: String, 
        required: true
    },
    productQuantity: {
        type: String, 
        required: true
    }, 
    productCategory: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
        "collection" : "products"
    }
)

module.exports = mongoose.model('Products', ProductSchema );
