const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footerController');

router.get('/get', footerController.getFooter);
router.post('/create', footerController.createFooter);

router.put('/updata/:id', footerController.updateFooterById);
router.delete('/delete/:id', footerController.deleteFooter);
module.exports = router;