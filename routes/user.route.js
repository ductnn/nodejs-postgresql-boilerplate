const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;