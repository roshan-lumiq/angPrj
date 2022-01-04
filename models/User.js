
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    number1: {
        type: Number,
        required: true
    }, number2: {
        type: Number
    }
});


module.exports = User = mongoose.model('user', UserSchema)