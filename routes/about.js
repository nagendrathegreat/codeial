const express = require('express');

const router = express.Router();

const aboutUserController = require('../controllers/aboutUser_controller');

router.get('/about',aboutUserController.about);

module.exports=router;