'use strict'
module.exports = function(app) {
    var userController = require('../controller/userController');
    var mailController = require('../controller/mailController');

    // todoList Routes
    app.route('/users')
        .get(userController._index)
        .post(userController.create);

    app.route('/login')
        .post(userController._login);

    app.route('/users/:user_email')
        .get(userController.findByEmail)
        .put(userController._update);

    app.route('/mail')
        .post(mailController.Mail);

};