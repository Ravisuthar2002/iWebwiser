const { dataExist } = require('../helper/check_existence.helper');
const { responseGenerator, parseIfString } = require('../helper/functions.helper');
const { setCacheData, getCacheData, deleteCacheData } = require('../helper/redis.helper');
const OurValues = require('../models/OurValue');
const { vars } = require('../server/constants');
const { statusCodeVars } = require('../server/statusCode');

exports.createOurValue = async (req, res, next) => {
    try {
        const existingOurValue = await OurValues.findOne({ where: { page: req.body.page } });
        dataExist(existingOurValue, vars.EXISTS_CONTENT, statusCodeVars.BADREQUEST);
        const newOurValue = await OurValues.create(req.body);
        await deleteCacheData(req.body.id, vars.OUR_VALUE_CACHE_KEY)
        return responseGenerator(res, vars.CREATE_OUR_VALUE, statusCodeVars.CREATED, newOurValue);
    } catch (error) {
        next(error);
    }
};



exports.getAllOurValues = async (req, res, next) => {
    try {
        let ourValuedata = await getCacheData(vars.OUR_VALUE_CACHE_KEY)
        if (ourValuedata) {
            console.log("redis");
            return responseGenerator(res, vars.FATCHED_OUR_VALUE, statusCodeVars.OK, JSON.parse(ourValuedata));
        }
        console.log("mysql");
        ourValuedata = await OurValues.findAll()
        const ourValuedataAll = ourValuedata.map(({ dataValues }) =>
            parseIfString(dataValues ?? {}, ['ourValueLists', 'cardWith'])
        );
        await setCacheData(vars.OUR_VALUE_CACHE_KEY, ourValuedataAll)
        return responseGenerator(res, vars.FATCHED_OUR_VALUE, statusCodeVars.OK, ourValuedataAll);
    } catch (error) {
        next(error)
    }
};


exports.getOurValuesById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let ourValuedata = await getCacheData(id);
        if (ourValuedata) {
            console.log("redis");
            return responseGenerator(res, vars.FATCHED_OUR_VALUE, statusCodeVars.OK, JSON.parse(ourValuedata));
        }
        console.log("mysql");
        ourValuedata = await OurValues.findOne({ where: { id: id } })
        const ourValue = parseIfString(ourValuedata.dataValues ?? {}, ['ourValueLists', 'cardWith'])
        await setCacheData(id, ourValue)
        return responseGenerator(res, vars.FATCHED_OUR_VALUE, statusCodeVars.OK, ourValue);
    } catch (error) {
        next(error)
    }
};



exports.updataOurValues = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        await OurValues.update(updatedData, {
            where: { id: id },
        });
        await deleteCacheData(id)
        await setCacheData(id, updatedData);
        return responseGenerator(res, vars.UPDATA_OUR_VALUE, statusCodeVars.OK, updatedData);
    } catch (error) {
        next(error);
    }
};



exports.deleteOurValue = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await OurValues.destroy({
            where: { id: id },
        });
        if (result === 0) {
            return responseGenerator(res, vars.NOT_EXIST_OUR_VALUE, statusCodeVars.NOT_FOUND, "error");
        }
        return responseGenerator(res, vars.DELETE_OUR_VALUE, statusCodeVars.OK, result);
    } catch (error) {
        next(error);
    }
};