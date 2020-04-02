const express = require('express');
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');

const router = express.Router();

// GET
router.get('/', controller.getUsers);
router.get('/create', controller.getCreateUser);
router.get('/:id', controller.getUserById);
router.get('/edit/:id', controller.getUpdateUser);

// POST
router.post('/create', validate.createUser, controller.createUser);

// UPDATE
router.post('/edit/:id', controller.updateUser);

// DELETE
router.get('/delete/:id', controller.deleteUser);

module.exports = router;