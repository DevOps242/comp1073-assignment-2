const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    product:  {type: mongoose.Types.ObjectId, ref: 'Products'}, 
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
        "collection" : "inventory"
    }
)

module.exports = mongoose.model('Inventory', InventorySchema );
