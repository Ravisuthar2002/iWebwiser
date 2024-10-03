const express = require('express');
const router = express.Router();
const contantController = require('../controllers/contentController');

router.post('/create', contantController.createContant);
router.get('/get', contantController.getContent)


module.exports = router;
