const pool = require('../config/database');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
    const id = parseInt(req.body.id);
    const { email, password } = req.body;    

    User.findOne({
        email
    }).then((user) => {
        // console.log(user.password);
        // console.log(req.body.password);

        if(!user){
            res.render('auth/login', {
                errors: [
                    'User is not exist'
                ],
                values: req.body
            });
            return;
        } else {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if(result){
                    req.session.userId = user.id;
                    res.redirect('/');
                } else{
                    res.render('auth/login', {
                        errors: [
                            'Wrong Password'
                        ],
                        values: req.body
                    });
                    return;
                }
            });
        }
    });
};
