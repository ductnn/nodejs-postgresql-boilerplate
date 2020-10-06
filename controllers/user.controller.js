const Promise = require('promise');
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const User = require('../models/user.model')

// GET

// GET all users
module.exports.getUsers = (req, res) => {
  User.findAll()
    .then((result) => {
      return res.render('users/index', {
        users: result
      })
    })
    .catch((err) => err);
}

// GET create user
module.exports.getCreateUser = (req, res) => {
  res.render('users/create');
};

// GET edit user
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
};

// GET Single users
module.exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  User.findOne({ id: id })
    .then((result) => {
      console.log(result.hash)
      return res.render('users/view', {
        user: result
      })
      // return res.status(200).json(result)
    })
    .catch((err) => err)
};

// POST
module.exports.createUser = (req, res) => {
  req.body.image = req.file.path.split('/').slice(1).join('/');
  User.create(req.body)
    .then(function(result) {
      res.redirect('/users');
    })
    .catch((err) => err);
};

// PUT
module.exports.updateUser = (req, res) => {
  const { name, email, phone, password } = req.body;
  const id = parseInt(req.params.id);

  User.update({ id: id, name: name, email: email, phone: phone, password: password })
    .then((result) => {
      res.redirect('/users');
      // return res.status(200).send(`User modified with ID: ${id}`);
    })
    .catch((err) => err);
};

// DELETE
module.exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id); 

  User.delete({ id: id })
    .then((result) => {
      res.redirect('/users');
    })
};

