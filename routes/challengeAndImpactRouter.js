const express = require('express');
const router = express.Router();
const ChallengeAndImpactController = require('../controllers/challengeAndImpactController');

router.post('/create', ChallengeAndImpactController.createChallengeAndImpact);
router.get('/get', ChallengeAndImpactController.getAllChallengeAndImpact);
// router.get('/getbyPage/:page', ChallengeAndImpactController.getContentByPageName)
// router.get('/getbyContainer/:containerName', contantController.getContentByContainerName)


module.exports = router;
