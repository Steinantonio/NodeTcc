'use strict'
const express = require('express');

const app = express();

//const cors = require('cors');
const apiRoutes = require("./routes/api-routes");
const jiraRoutes = require('./routes/jira-api-routes');


const user = require('./models/userModel');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
apiRoutes(app);
jiraRoutes(app);


const connection = mongoClient.connect('mongodb://localhost:27017/logistica', { useNewUrlParser: true });

// connections config
const port = process.env.PORT || 3000;
const host = '0.0.0.0';
const db = connection;

//app.use(cors());

app.get('/', function(req, res) {
    res.json(({ Hello: 'World' }));
});
app.listen(port, host, function() {
    console.log(port);
    console.log("Server started.......");
});







