const Promise = require('promise');
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const User = require('../models/user.model')

// GET

//-- GET all users
module.exports.getUsers = (req, res) => {
  User.findAll()
    .then((result) => {
      return res.render('users/index', {
        users: result
      })
    })
    .catch((err) => err);
  
  // pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   // res.status(200).json(results.rows)
  //   console.log(results.rows[0].password)
  //   res.render('users/index',{
  //     users: results
  //   });
  // })
}

//-- GET create user
module.exports.getCreateUser = (req, res) => {
  res.render('users/create');
};

//-- GET edit user
module.exports.getUpdateUser = (req, res) => {
  const id = parseInt(req.params.id);

  User.findOne({ id: id })
    .then((result) => {
      return res.render('users/edit', {
        user: result
      })
      // return res.status(200).json(result)
    })
    .catch((err) => err)

  // pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   // res.status(200).json(results.rows);
  //   console.log(results.rows[0]);
  //   res.render('users/edit', {
  //     user: results.rows[0]
  //   })
  // });
};

//--GET Single users
module.exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  User.findOne({ id: id })
    .then((result) => {
      return res.render('users/view', {
        user: result
      })
      // return res.status(200).json(result)
    })
    .catch((err) => err)

  // pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   // res.status(200).json(results.rows);
  //   console.log(results.rows[1]);
  //   res.render('users/view', {
  //     user: results.rows[0]
  //   })
  // });
};



// POST
module.exports.createUser = (req, res) => {
  req.body.image = req.file.path.split('/').slice(1).join('/');
  User.create(req.body)
    .then(function(result) {
      res.redirect('/users');
    })
    .catch((err) => err);
  // const { name, email, phone, password } = req.body;
  // req.body.image = req.file.path.split('/').slice(1).join('/');

  // bcrypt.hash(req.body.password, 10, function(err, hash) {
  //   // Store hash in your password DB.
  //   pool.query(
  //     'INSERT INTO users (name, email, phone, password, image) VALUES ($1, $2, $3, $4, $5)', 
  //     [name, email, phone, hash, req.body.image], 
  //     (error, results) => {
  //       if (error) {
  //         throw error;
  //       };
  //       // res.status(201).send(`User added with ID: ${result.insertId}`);    
  //       res.redirect('/users');
  //     }
  //   );    
  // });  
  // console.log(req.body);
};

// PUT
module.exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  User.update({ id: id })
    .then((result) => {
      res.redirect('/users');
    })
    .catch((err) => err);

  // const { name, email, phone, password } = req.body;

  // bcrypt.hash(req.body.password, 10, function(err, hash) {
  //   // Store hash in your password DB.
  //   pool.query(
  //     'UPDATE users SET name = $1, email = $2, phone = $3, password = $4 WHERE id = $5',
  //     [name, email, phone, hash, id],
  //     (error, results) => {
  //       if (error) {
  //         throw error;
  //       };
  //       // res.status(200).send(`User modified with ID: ${id}`);
  //       res.redirect('/users');
  //     }
  //   );
  // });
};

// DELETE
module.exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id); 

  User.delete({ id: id })
    .then((result) => {
      res.redirect('/users');
    })

  // pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
  //   if (error) {
  //     throw error;
  //   };
  //   // res.status(200).send(`User deleted with ID: ${id}`);
  //   res.redirect('/users');
  // });
};

