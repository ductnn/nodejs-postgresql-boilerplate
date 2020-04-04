const express = require('express');
const multer = require('multer');
const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
});

const fileUpload = multer({ storage: storage });

// GET
router.get('/', controller.getUsers);
router.get('/create', controller.getCreateUser);
router.get('/:id', controller.getUserById);
router.get('/edit/:id', controller.getUpdateUser);

// POST
router.post('/create', 
    fileUpload.single('image'), 
    validate.createUser, 
    controller.createUser
);

// UPDATE
router.post('/edit/:id', controller.updateUser);

// DELETE
router.get('/delete/:id', controller.deleteUser);

module.exports = router;