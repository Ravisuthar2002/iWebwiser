const { dataExist } = require('../helper/check_existence.helper');
const { responseGenerator, parseIfString } = require('../helper/functions.helper');
const { setCacheData, getCacheData, deleteCacheData } = require('../helper/redis.helper');
const HeaderContent = require('../models/HeaderContent');
const { vars } = require('../server/constants');
const { statusCodeVars } = require('../server/statusCode');

exports.createHeaderContent = async (req, res, next) => {
    try {
        const existingHeaderContent = await HeaderContent.findOne({ where: { title: req.body.title } });
        dataExist(existingHeaderContent, vars.EXIST_HEADER_CONTENT, statusCodeVars.BADREQUEST)
        const headerContent = await HeaderContent.create(req.body);
        await deleteCacheData(req.body.id)
        return responseGenerator(res, vars.CREATE_HEADER_CONTENT, statusCodeVars.CREATED, headerContent);
    } catch (error) {
        next(error)
    }
};

exports.getHeaderContent = async (req, res, next) => {
    try {
        const index = req.params.id;
        let allHeaderContents = await getCacheData(index)
        if (allHeaderContents) {
            console.log("redis");
            return responseGenerator(res, vars.FATCHED_HEADER_CONTENT, statusCodeVars.OK, JSON.parse(allHeaderContents))
        }
        console.log("mysql");
        allHeaderContents = await HeaderContent.findOne({ where: { id: index } })
        allHeaderContents = parseIfString(allHeaderContents ?? {}, ["logos", "navigationMenus"])
        await setCacheData(index, allHeaderContents)
        return responseGenerator(res, vars.FATCHED_HEADER_CONTENT, statusCodeVars.OK, allHeaderContents)
    } catch (error) {
        next(error)
    }

};
