'use strict'
require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports.Mail = async function (req, res, next) {
    
    //Json config
    if (req.body.emails){
        exports.jsonArray = req.body.emails;
        
    }else console.error('Emails object not present on json '), process.exit(404);
    
    //mail opts
    const subj = req.body.subject;
    const msg = req.body.message;
    
    //map to return array of recipients
    const recipients = exports.jsonArray.map(function (element) {
        return element.email;
    });
    
    //Config of the account that send the email
    const smtpConfig = {
        host: process.env.SMTP,
        service: process.env.EMAIL_SERVICE,
        port: 465,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASS
        }
    };
    //create transporter
    const transporter = nodemailer.createTransport(smtpConfig);
    
    try {
        const mailOptions = {
            to: recipients, // list of receivers
            subject: subj, // Subject line
            html: msg// plain text body
        };
    
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) throw new Error(error);
            console.log(info);
            transporter.close();
        });
    }
    catch (error){
        console.log(error);
        return error;
    }
    
    res.sendStatus(200).send(res.body);
    next();
};




    
    


