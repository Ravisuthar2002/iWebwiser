const express = require('express');
const router = express.Router();
const navbarController = require('../controllers/navbarController');

router.get('/get', navbarController.getNavbar);
router.get('/getpage', navbarController.getAllPages);

router.post('/create', navbarController.createNavbar);

router.put('/updata/:id', navbarController.updataNavbar);

router.delete('/delete/:id', navbarController.deleteNavbar);
module.exports = router;
