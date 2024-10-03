const { dataExist } = require('../helper/check_existence.helper');
const responseGenerator = require('../helper/functions.helper');
const { setCacheData, getCacheData } = require('../helper/redis.helper');
const HeaderContent = require('../models/HeaderContent');
const { vars } = require('../server/constants');
const { statusCodeVars } = require('../server/statusCode');

exports.createHeaderContent = async (req, res, next) => {
    try {
        let { title, subtitle, text, body, label, href, featuredMedia, section, page, navigationMenus, logos } = req.body;
        title = title.trim()
        const existingHeaderContent = await HeaderContent.findOne({ where: { title } });
        dataExist(existingHeaderContent, vars.EXIST_HEADER_CONTENT, statusCodeVars.BADREQUEST)
        const headerContent = await HeaderContent.create({ title, subtitle, text, body, label, href, featuredMedia, section, page, navigationMenus: navigationMenus, logos: logos });
        setCacheData(vars.HEADER_CONTENT_CACHE_KEY, headerContent)
        return responseGenerator(res, vars.CREATE_HEADER_CONTENT, statusCodeVars.CREATED, headerContent);
    } catch (error) {
        next(error)
    }
};



exports.getHeaderContent = async (req, res, next) => {
    try {
        const allHeaderContents = await getCacheData(vars.HEADER_CONTENT_CACHE_KEY)
        let allDataParse = JSON.parse(allHeaderContents)
        if (!allDataParse) {
            const headerContent = await HeaderContent.findOne()
            headerContent.dataValues.logos = typeof headerContent.logos == "string" ? JSON.parse(headerContent.logos) : headerContent.logos
            headerContent.dataValues.navigationMenus = typeof headerContent.navigationMenus == "string" ? JSON.parse(headerContent.navigationMenus) : headerContent.navigationMenus
            allDataParse = headerContent
            await setCacheData(vars.HEADER_CONTENT_CACHE_KEY, headerContent)
        }
        return responseGenerator(res, vars.FATCHED_HEADER_CONTENT, statusCodeVars.OK, allDataParse)
    } catch (error) {
        next(error)
    }

};
