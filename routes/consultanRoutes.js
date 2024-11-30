const express = require('express');
const router = express.Router();
const consultanFromController = require('../controllers/consultanFormController');

router.get('/getAll', consultanFromController.getConsultanForm)
router.get('/get/:id', consultanFromController.getConsultanFormById)

router.post('/create', consultanFromController.createConsultanForm);
router.put('/updata/:id', consultanFromController.updateConsultanForm)

router.delete('/delete/:id', consultanFromController.deleteConsultanForm)

module.exports = router;
