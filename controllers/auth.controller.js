const pool = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    // const email = req.body.email; 
    // const pass = bcrypt.hash(req.body.password, 10); 
    // SELECT * FROM users WHERE email = ? AND password = ? 
    
    pool.query(
        'SELECT email, password, id FROM users WHERE email = ? AND password = ?', 
        [email, password], 
        (error, results) => {
            if (error) {
                throw error;
            };
            if(!results.length){
                res.render('auth/login', {
                    errors: [
                        'User does not exist'
                    ],
                    values: req.body
                });
                return;
            };

            const isValid = bcrypt.compareSync(password, results.rows[0].password);
            if(!isValid){
                res.render('auth/login', {
                    errors: [
                        'Wrong password'
                    ],
                    values: req.body 
                });
                return;
            }

            res.cookie('email', email, {
                signed: true
            })
            
            
            // res.status(201).send(`User added with ID: ${result.insertId}`);    
            res.redirect('/users');
        }
    );  
};
