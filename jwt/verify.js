const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        next()
    }
}

exports.verify = (req, res, next) => {
    //console.log("Logging " + req.token)
    return jwt.verify(req.token, CONFIG.jwt_encryption, (err, authData) => {
        if (err) {
            return false
        } else {

            return authData;
        }


    });
}