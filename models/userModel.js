'use strict'
var moongoose = require('mongoose');

//Schema for handling information to be inserted
var userSchema = moongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    papel: {
        type: String,
        required: true
    },
});


module.exports = moongoose.model('User', userSchema);