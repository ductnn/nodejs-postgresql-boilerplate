const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

// module.exports.postLogin = (req, res) => {
//     const { email, password } = req.body;
  
//     bcrypt.hash(req.body.password, 10, function(err, hash) {
//       // Store hash in your password DB.
//       pool.query(
//         'SELECT email, password FROM users', 
//         [email, hash], 
//         (error, results) => {
//           if (error) {
//             throw error;
//           };
//           if(!results.rows[0]){
//             res.render('auth/login', {
//                 errors: [
//                     'User does not exist'
//                 ],
//                 values: req.body
//             });
//             return;
//           }
//           // res.status(201).send(`User added with ID: ${result.insertId}`);    
//           res.redirect('/users');
//         }
//       );    
//     });  
//   };
