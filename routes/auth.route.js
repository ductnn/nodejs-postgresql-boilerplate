const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

// GET
router.get('/login', controller.login);

// POST
// router.post('/login', controller.postLogin);

module.exports = router;