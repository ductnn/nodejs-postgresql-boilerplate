const User = require('../models/user.model');

module.exports.requireAuth = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect('/auth/login');
    };

    next();
};