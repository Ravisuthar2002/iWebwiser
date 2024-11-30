const express = require('express');
const router = express.Router();
const ourValuesController = require('../controllers/ourValuesController');

router.post('/create', ourValuesController.createOurValue);

router.get('/getAll', ourValuesController.getAllOurValues);

router.get('/get/:id', ourValuesController.getOurValuesById)

router.put('/updata/:id', ourValuesController.updataOurValues);

router.delete('/delete/:id', ourValuesController.deleteOurValue)
module.exports = router;
