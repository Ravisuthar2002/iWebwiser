const express = require('express');
const router = express.Router();
const navbarController = require('../controllers/navbarController');

router.post('/create', navbarController.createNavbar);
router.get('/get', navbarController.getNavbar);
router.get('/getpage', navbarController.getAllPages);


module.exports = router;
