
const express = require('express');
const homeController = require('../controllers/home_controller');
const router = express.Router();

console.log('Router Loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));

// for any further routes, access from here 
// router.use('/routerName',require('./routerfile));
router.use('/users',require('./about'));

module.exports = router;
