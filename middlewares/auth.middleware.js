const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../key');

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
};

module.exports.checkToken = (req, res, next) => {
    // if(!req.session.userId){
    //     return res.redirect('/auth/login');
    // };
    // const token = req.headers.authorization;

    try {
        const token = localStorage.getItem('token');
        // const token = req.body.token || req.query.token || req.headers["x-access-token"];
            jwt.verify(token, secretKey, (err, payload) => {
                if (payload) {
                    req.user = payload;
                    next();
                } else {
                    res.redirect('/auth/login');
                }
            })
    } catch (err) {
        res.status(401).send('No token provided');
    }

    
};

module.exports.protectedRoute = (req, res, next) => {
    if (req.user) {
        return next();
    };
};