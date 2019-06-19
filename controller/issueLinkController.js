'use strict'
const request = require('request');
const jiraModel = require("../models/jiraModel");
const email = 'falecomalexaugusto@gmail.com';
const password = 'integracao.jira';
const base_url = 'https://logisticareversa.atlassian.net';

var rest_api_issue_link_url = base_url + '/rest/api/3/issueLink';
var rest_api_issueLink_id = base_url + '/rest/api/3/issue/';

module.exports.create = function(req, res, next) {
    jiraModel.HeadersForRequest(req, res);


    const json = req.body;
    const options = jiraModel.options(rest_api_issue_link_url, 'POST', json);
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
            console.log('Response Success : ' + response.statusCode, body, "doesnt return BODY"); // Dev purposes
            res.send({
                status: response.statusCode + ' Success',
                body: body,
                issueKeyOutward: json.outwardIssue.key,
                issueKeyInward: json.inwardIssue.key
            });
            next();
        };
    });
};


module.exports.delete = function(req, res, next) {
    jiraModel.options(req, res);

    const url = rest_api_issue_link_url.concat('/').concat(exports.link_id);
    const options = jiraModel.options(url, 'DELETE', null);
    request(options, function(error, response, body) {

        // handle error args
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
        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response with link type ID: ' + response.statusCode + ' ' + response.statusMessage);
            console.log(body);
            res.send({ SuccessData: body, SuccessMessage: 'Sucessfully deleted Links' });
            next();
        };
    });
};


module.exports.find = function(req, res, next) {

    const urlFinal = rest_api_issueLink_id.concat(req.params.issue_id).concat('?fields=issuelinks');
    const options = jiraModel.options(urlFinal, 'GET', null);
    request(options, function(error, response, body) {
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

        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            console.log('Response with link type ID: ' + response.statusCode + ' ' + response.statusMessage);
            console.log(body);
            res.send({ SuccessData: body });
            next();
        };
    });
};


module.exports.getLinkId = function(req, res, next) {
    jiraModel.HeadersForRequest(req, res);
    const issue_key = req.params.issue_id;
    const get_link_id = rest_api_issueLink_id.concat(issue_key).concat('?fields=issuelinks');

    const optionsForLink = jiraModel.options(get_link_id, 'GET', null);
    request(optionsForLink, function(error, response, body) {
        //handle error parameter
        if (error === null || !error) {
            if (body != undefined) {
                var errors = body.errors
            };
        } else res.send(res.status(400).send({ error: "Error, request error param is not null check create request" }));
        //handle response status if error
        if (response.statusCode === 400 || response.statusCode >= 400) {
            if (body.fields.issuelinks.length <= 0) {
                res.send('Issue not linked to any other issue');
                console.error('Response Error : ' + response.statusCode, body);
                next();
            };
            if (errors && errors.length > 0) {
                res.send({ ErrorData: errors });
            } else res.send(body);
            console.error('Response Error : ' + response.statusCode, body);
            next();
        };

        if (response.statusCode <= 210 || !response.statusCode >= 400) {
            if (body.fields.issuelinks.length > 0) {
                if (body.fields.issuelinks[0].id) {
                    module.exports.link_id = body.fields.issuelinks[0].id;
                    console.log('This is the Response from GET LINK ID : ', response.statusCode);
                    console.log('Log Body for more answers if needed LINE : 106');
                    next();
                }
            } else res.send("Issue does not have a link attached to it"), console.log(response.statusCode, 'noLinkedIssue');
        };
    });
};