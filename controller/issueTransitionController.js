'use strict'
const request = require('request');
const jiraModel = require("../models/jiraModel");

const base_url = 'https://logisticareversa.atlassian.net';
const rest_api_issue_url = base_url + '/rest/api/3/issue/';

module.exports.transitionIssue = function(req, res, next) {
    jiraModel.HeadersForRequest(req, res);
    const issue_key = req.params.issue_id;
    const json = req.body;
    const url = rest_api_issue_url.concat(issue_key).concat('/transitions');

    const options = jiraModel.options(url, 'POST', json);
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
            res.send({ SuccessData: body, IssueTransitioned: issue_key, MessageSucess: 'Sucessfully Transitioned Issue' });
            next();
        };
    });


};