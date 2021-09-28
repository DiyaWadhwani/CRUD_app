const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    brandName : {
        type : String,
        required: true
    },
    productName : {
        type: String,
        required: true,
    },
    aboutBrand : {
        type: String,
        required: true,
    },
    aboutProduct : {
        type: String,
        required: true,
    },
    productType : {
        type: String,
        required: true,
    }
})

const Registration = mongoose.model('registrations', schema);

module.exports = Registration;