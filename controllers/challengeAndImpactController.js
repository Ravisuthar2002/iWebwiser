const { responseGenerator, parseIfString } = require('../helper/functions.helper');
const ChallengeAndImpact = require('../models/ChallengeAndImpact');
const { vars } = require('../server/constants');
const { statusCodeVars } = require('../server/statusCode');
const { dataExist } = require('../helper/check_existence.helper');
const { getCacheData, setCacheData } = require('../helper/redis.helper');

exports.createChallengeAndImpact = async (req, res, next) => {
    try {
        const existingChallenge = await ChallengeAndImpact.findOne({ where: { page: req.body.index } });
        dataExist(existingChallenge, vars.EXISTS_CHALLENGE_DATA, statusCodeVars.BADREQUEST);
        const challengeAndImpact = await ChallengeAndImpact.create(req.body);
        responseGenerator(res, vars.CREATE_CHALLENGE_DATA, statusCodeVars.CREATED, challengeAndImpact)
    } catch (error) {
        next(error)
    }
};

exports.getAllChallengeAndImpact = async (req, res, next) => {
    try {
        let challengeAndImpactData = await getCacheData(vars.CHALLENGE_DATA_KEY)
        if (challengeAndImpactData) {
            console.log("redis");
            return responseGenerator(res, vars.FATCHED_CHALLENGE_DATA, statusCodeVars.OK, JSON.parse(challengeAndImpactData))
        }
        console.log("mysql");
        challengeAndImpactData = await ChallengeAndImpact.findAll();
        const challengeDataAll = challengeAndImpactData.map(({ dataValues }) =>
            parseIfString(dataValues ?? {}, ['featuredMedia', 'sub_content'])
        );
        await setCacheData(vars.CHALLENGE_DATA_KEY, challengeDataAll);
        return responseGenerator(res, vars.FATCHED_CHALLENGE_DATA, statusCodeVars.OK, challengeDataAll);
    } catch (error) {
        next(error)
    }
};

