'use strict'
module.exports = function(app) {

    const issueController = require('../controller/issueController');
    const issueLinkController = require('../controller/issueLinkController');
    const issueTransitionController = require('../controller/issueTransitionController')

    // ************** Issue Controller **************
    app.route('/jira/issue')
        .post(issueController.create);

    app.route('/jira/jql/search')
        .post(issueController.findByJQL)

    app.route('/jira/issue/:issue_id')
        .put(issueController.update)
        .get(issueController.find)
        .post(issueController.comment)
        .delete(issueController.delete);

    // ************** Transition Controller **************

    app.route('/jira/issueTransition/:issue_id')
        .post(issueTransitionController.transitionIssue);

    // ************** Link Controller **************
    app.route('/jira/issue-link')
        .post(issueLinkController.create);

    app.route('/jira/issue-link/:issue_id')
        .get(issueLinkController.find)
        .delete(issueLinkController.getLinkId,
            issueLinkController.delete);

};