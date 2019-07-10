'use strict'

const request = require('request');


const base_url = 'https://logistica-reversa1.atlassian.net';
const rest_api_issue_url = base_url + '/rest/api/3/issue/';
const search_with_jql = base_url + '/rest/api/3/search';
const jiraModel = require('../models/jiraModel');


module.exports.create = function(req, res, next) {

    jiraModel.HeadersForRequest(req, res); //headers
    let json = req.body;

    const options = jiraModel.options(rest_api_issue_url, 'POST', json);
    console.log(options);
    request(options, function(error, response, body) {

        //handle error parameter
        if (error === null || !error) {
            if (body != undefined) {
                var errors = body.errors
            };
        } else res.send(res.status(400).send({ error: "Error, request error param is not null check create request" }));

        //handle response status if error
        if (response.statusCode === 400 || response.statusCode >= 400) {
            console.error('Response Error : ' + response.statusCode, body);
            if (errors && errors.length > 0) {
                res.send({ ErrorData: errors });
            } else res.send(body);
            next();
        };

        //handle response if success
        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response Success: ' + response.statusCode, body); // Dev purposes
            res.send({ SuccessData: body });
            next();
        };
    });
};


module.exports.delete = function(req, res, next) {

    jiraModel.HeadersForRequest(req, res);
    const issue_key = req.params.issue_id;
    const url = rest_api_issue_url.concat(issue_key);

    const options = jiraModel.options(url, 'DELETE', null);
    request(options, function(error, response, body) {

        //handle error parameter
        if (error === null || !error) {
            if (body !== undefined) {
                var errors = body.errors
            };
        } else res.send(res.status(400).send({ error: "Error, request error param is not null check create request" }));
        //handle response status if error
        if (response.statusCode === 400 || response.statusCode >= 400) {
            console.error('Response Error : ' + response.statusCode, body); // im sending both, because delete is sending error messages instead of errors
            if (errors && errors.length > 0) {
                res.send({ ErrorData: errors });
            } else res.send(body);
            next();
        };
        //handle response if success
        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response Success: ' + response.statusCode, body); // Dev purposes
            res.send({ SuccessData: body, SuccessMessage: 'Deleted Sucessfully', issueKey: issue_key });
            next();
        };

    });
};


module.exports.find = function(req, res, next) {
    jiraModel.HeadersForRequest(req, res);
    const issue_key = req.params.issue_id;
    const url = rest_api_issue_url.concat(issue_key);

    const options = jiraModel.options(url, 'GET');
    request(options, function(error, response, body) {

        //handle error parameter
        if (error === null || !error) {
            if (body !== undefined) {
                var errors = body.errors
            };
        } else res.send(res.status(400).send({ error: "Error, request error param is not null check create request" }));
        //handle response status if error
        if (response.statusCode === 400 || response.statusCode >= 400) {
            console.error('Response Error : ' + response.statusCode, body);
            if (errors && errors.length > 0) {
                res.send({ ErrorData: errors });
            } else res.send(body);
            next();
        };
        //handle response if success
        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response Success: ' + response.statusCode, 'Log Body for specifications'); // Dev purposes
            res.send({ SuccessData: body });
            next();
        };
        
    });
};


module.exports.update = function(req, res, next) {

    jiraModel.HeadersForRequest(req, res);
    const issue_key = req.params.issue_id;
    const url = rest_api_issue_url.concat(issue_key);
    const json = req.body;

    const options = jiraModel.options(url, 'PUT', json);
    request(options, function(error, response, body) {

        if (error === null || !error) {
            if (body !== undefined) {
                var errors = body.errors
            };
        } else res.send(res.status(400).send({ error: "Error, request error param is not null check create request" }));

        if (response.statusCode === 400 || response.statusCode >= 400) {
            console.error('Response Error : ' + response.statusCode, body);
            if (errors && errors.length > 0) {
                res.send({ ErrorData: errors });
            } else res.send(body);
            next();
        };
        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response Success: ' + response.statusCode, body);
            res.send({ FieldsChanged: json, Issue: url });
            next();
        };
    });
};

module.exports.findByJQL = function(req, res, next) {

    jiraModel.HeadersForRequest(req, res);
    const url = search_with_jql;
    const json = req.body;
    console.log(url);
    const options = jiraModel.options(url, 'POST', json);
    request(options, function(error, response, body) {
        if (error === null || !error) {
            if (body !== undefined) {
                var errors = body.errors
            };
        } else res.send(res.status(400).send({ error: "Error, request error param is not null check create request" }));

        if (response.statusCode === 400 || response.statusCode >= 400) {
            console.error('Response Error : ' + response.statusCode, body);
            if (errors && errors.length > 0) {
                res.send({ ErrorData: errors });
            } else res.send(body);
            next();
        };
        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response Success: ' + response.statusCode, body);
            res.send({ body });
            next();
        };
    });
};

module.exports.comment = function(req, res, next) {

    jiraModel.HeadersForRequest(req, res);
    const issue_key = req.params.issue_id;
    const url = rest_api_issue_url.concat(issue_key).concat('/comment');
    const json = req.body;

    const options = jiraModel.options(url, 'POST', json);
    request(options, function(error, response, body) {

        if (error === null || !error) {
            if (body !== undefined) {
                var errors = body.errors
            };
        } else res.send(res.status(400).send({ error: "Error, request error param is not null check create request" }));

        if (response.statusCode === 400 || response.statusCode >= 400) {
            console.error('Response Error : ' + response.statusCode, body);
            if (errors && errors.length > 0) {
                res.send({ ErrorData: errors });
            } else res.send(body);
            next();
        };
        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response Success: ' + response.statusCode, body);
            res.send({ FieldsChanged: body, Issue: issue_key });
            next();
        };
    });
};
