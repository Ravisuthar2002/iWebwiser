const { dataExist } = require('../helper/check_existence.helper');
const responseGenerator = require('../helper/functions.helper');
const { getCacheData, setCacheData } = require('../helper/redis.helper');
const Content = require('../models/Content');
const { vars } = require('../server/constants');
const { statusCodeVars } = require('../server/statusCode');

exports.createContant = async (req, res, next) => {
    try {
        let { title, subtitle, body, label, href, featuredMedia, logos, lists, section, page, weight, position } = req.body;
        title = title.trim()
        subtitle = subtitle.trim()
        const existingheaderContent = await Content.findOne({ where: { title, subtitle } });
        dataExist(existingheaderContent, vars.EXISTS_CONTENT, statusCodeVars.BADREQUEST)

        const content = await Content.create({ title, subtitle, body, label, href, featuredMedia: featuredMedia, logos: logos, lists: lists, section, page, weight, position });
        // const contant = await Content.create(req.body);
        setCacheData(vars.CONTENT_CACHE_KEY, content)
        return responseGenerator(res, vars.CREATE_CONTENT, statusCodeVars.CREATED, content);
    } catch (error) {
        next(error)
    }
};

exports.getContent = async (req, res, next) => {
    try {
        const contentData = await getCacheData(vars.CONTENT_CACHE_KEY)
        let allDataParse = JSON.parse(contentData)
        if (!allDataParse) {
            const content = await Content.findOne()
            content.dataValues.featuredMedia = typeof content.featuredMedia == "string" ? JSON.parse(content.featuredMedia) : content.featuredMedia
            content.dataValues.logos = typeof content.logos == "string" ? JSON.parse(content.logos) : content.logos
            content.dataValues.lists = typeof content.lists == "string" ? JSON.parse(content.lists) : content.lists
            allDataParse = content
            await setCacheData(vars.CONTENT_CACHE_KEY, content)
        }
        return responseGenerator(res, vars.FATCHED_CONTENT, statusCodeVars.OK, allDataParse);
    } catch (error) {
        next(error)
    }
};
