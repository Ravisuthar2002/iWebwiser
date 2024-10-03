const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footerController');

router.post('/create', footerController.createFooter);
router.get('/get', footerController.getFooter);

module.exports = router;