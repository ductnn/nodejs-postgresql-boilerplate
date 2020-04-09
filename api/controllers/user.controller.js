const bcrypt = require('bcrypt');
const User = require('../../models/user.model');
const pool = require('../../config/database');

// GET

//-- GET all users
module.exports.getUsers = (req, res) => {
  User.findAll()
    .then(results => {
      res.status(200).json(results);
    })
    .catch(e => e);
};


//--GET Single users
module.exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  User.findOne({ id: id})
    .then(results => {
      res.status(200).json(results);
    })
    .catch(e => e);
};



// POST
module.exports.createUser = (req, res) => {
  req.body.image = req.file.path.split('/').slice(1).join('/');
  User.create(req.body)
    .then(function(result) {
      res.status(201).send(`User added with ID: ${result.insertId}`);
    })
    .catch((err) => err); 
};

// PUT
module.exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, password } = req.body;

  User.update({ id: id, name: name, email: email, phone: phone, password: password })
  .then((result) => {
    // res.redirect('/users');
    return res.status(200).send(`User modified with ID: ${id}`);
  })
  .catch((err) => err);
};

// DELETE
module.exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id); 

  User.delete({ id: id })
    .then(() => {
      res.status(200).send(`User deleted with ID: ${id}`);
    })
};

