const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    productId: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'products'} 
    }, 
    availableQty: {
        type: String, 
        required: true
    }, 
    orderQty: {
        type: String
    },
    units: {
        type: String, 
        required: true
    }, 
    unitPrice: {
        type: String, 
        required: true
    }, 
    totalValue: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
        "collection" : "inventory",
        productId: true
    }
)

module.exports = mongoose.model('Inventory', InventorySchema );
