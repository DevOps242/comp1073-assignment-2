const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    employeeFirstName: {
        type: String, 
        required: true
    }, 
    employeeLastName: {
        type: String, 
        required: true
    }, 
    employeeAddress: {
        type: String, 
        required: true
    },
    employeePhoneNumber: {
        type: String, 
        required: true
    }, 
    employeeDepartment: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    },
}, {
        "collection" : "employees"
    }
)

module.exports = mongoose.model('Employees', EmployeeSchema );

