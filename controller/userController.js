'use strict'
var Users = require('../models/userModel');
var mongoose = require('mongoose');
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


var userSchema = mongoose.model('User');

module.exports._login = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("logistica");
        var query = { email: req.body.email, senha: req.body.senha };
        dbo.collection("user").find(query).toArray(function(err, result) {
            res.send(result);
            db.close();
        });
    });
}

module.exports._index = function(req, res) {

    //Somente para trabalhar com o MongoClient
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("logistica");
        dbo.collection("user").find({}).toArray(function(err, result) {
            res.send(result);
            db.close();
        });
    });
};

module.exports.findByEmail = function(req, res) {
    console.log(req)
    mongoClient.connect(url, function(err, db) {

        var query = { email: req.params.user_email };
        var dbo = db.db("logistica");

        dbo.collection("user").find(query).toArray(function(err, result) {
            res.send(result)
            db.close();
        });
    });

}
module.exports._update = function(req, res) {
    console.log(req)
}

//handle the creation
module.exports.create = (req, res) => {
    // Create a Note
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var userSchema = new Users({
        nome: req.body.nome || "Unnamed",
        email: req.body.email,
        senha: req.body.senha,
        papel: req.body.papel
    });
    //Somente para trabalhar com o MongoClient
    mongoClient.connect(url, function(err, db) {
        var dbo = db.db("logistica");
        dbo.collection("user").insertOne(userSchema, function(err, resDb) {
            res.send('{"result": "OK"}');
        });
    });
};


//hold the view info 
module.exports.view = function(req, res) {
    userSchema.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

module.exports.update = (req, res) => {

    userSchema.findByIdAndUpdate(req.params.user_id, {
            nome: req.body.nome || "Unnamed",
            email: req.body.email,
            senha: req.body.senha,
            papel: req.body.papel
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Usuario não encontrado" + req.params.user_id
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Usuario não encontrado com id " + req.params.user_id
                });
            }
            return res.status(500).send({
                message: "Erro ao dar update com usuario de id " + req.params.user_id
            });
        });
};

// Handle delete 
module.exports.deleteOne = function(req, res) {
    userSchema.remove({
        _id: req.params.user_id
    }, function(err, users) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};