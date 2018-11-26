var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();
var CryptoJS = require("crypto-js");

/* GET captcha. */
router.get('/', function(req, res, next) {
    var captcha = svgCaptcha.create({
        noise: 1,
        background: 'ghostwhite'
    });

    const jsonResponse = {
        secret: "" + CryptoJS.HmacSHA256(captcha.text, "<key_placeholder>").words[0],
        svg: captcha.data
    }
    res.status(200).json(jsonResponse);
});

module.exports = router;
