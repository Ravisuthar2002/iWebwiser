const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/getAll/', contentController.getAllContent);
router.get('/get/:id', contentController.getContentById);

router.post('/create', contentController.createContent);

router.put('/updata/:id', contentController.updateContentById);

router.delete('/delete/:id', contentController.deleteContentById);

module.exports = router;
