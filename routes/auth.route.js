const express = require('express');
const controller = require('../controllers/auth.controller');

const router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
};

const token = localStorage.getItem('token');

// GET
router.get('/login', controller.login);
router.get('/logout', (req, res) => {
    localStorage.removeItem('token');
    res.redirect('/');
});

// POST
router.post('/login', controller.postLogin);

module.exports = router;