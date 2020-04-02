const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

// GET
router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);

// POST
router.post('/create', controller.createUser);

// PUT
router.put('/edit/:id', controller.updateUser);

// DELETE
router.delete('/delete/:id', controller.deleteUser);

module.exports = router;