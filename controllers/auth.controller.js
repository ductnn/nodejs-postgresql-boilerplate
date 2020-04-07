const pool = require('../config/database');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
    const id = parseInt(req.body.id);
    const { email, password } = req.body;    

    User.findOne({email: email, password: password})
        .then((result) => {
            const isValid = bcrypt.compare(req.body.password, result.password)

            if(result.email !== req.body.email) {
                return res.render('auth/login', {
                    errors: [
                        'User does not exist'
                    ],
                    values: req.body
                });

            };

            if(!isValid) {
                return res.render('auth/login', {
                    errors: [
                        'Wrong password'
                    ],
                    values: req.body 
                });

            }

            res.cookie('id', result.id, {
                signed: true
            })
            
            // res.status(201).send(`User added with ID: ${result.insertId}`);    
            res.redirect('/users');
        })
        .catch((err) => err)
};
