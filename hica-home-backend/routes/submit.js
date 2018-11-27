var express = require('express');
var router = express.Router();
var CryptoJS = require("crypto-js");

const log4js = require('log4js');
log4js.configure({
    appenders: { registration: { type: 'file', filename: 'output_registration.log' } },
    categories: { default: { appenders: ['registration'], level: 'info' } }
});

const logger = log4js.getLogger('registration');

/* POST register. */
router.post("/", function (req, res) {
    const json = req.body
    console.log(json)
    
    const token = "" + CryptoJS.HmacSHA256(json.captchaInput, "<key_placeholder>").words[0]
    const match = token === json.captchaSecret

    if (match) {
        const logString = '[' + json.name + ',' + json.id + ',' + json.phone + ',' + json.email + ']'
        logger.info(logString)
    }

    res.status(200).json({ isSuccess: match })
});

module.exports = router;
