const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../config/database');
const User = require('../models/user.model');
const { secretKey } = require('../key');

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
};


module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
    const email = req.body.email;

    User.getUserByUserEmail({
        email
    }).then((user) => {
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
                    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
                    // res.status(200).json({
                    //     userId: user.id,
                    //     token: token
                    // });
                    // req.session.userId = user.id;
                    // res.cookie('jwt', jwt, { httpOnly: true, secure: true });
                    localStorage.setItem('token', token);
                    // res.send("Login Successfully");
                    res.redirect('/users');
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
