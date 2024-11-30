const Footer = require("../models/Footer");
const { responseGenerator, parseIfString } = require('../helper/functions.helper.js')
const { vars } = require('../server/constants.js');
const { statusCodeVars } = require('../server/statusCode.js');
const { setCacheData, getCacheData, deleteCacheData } = require("../helper/redis.helper.js");
const { dataExist, dataNotExist } = require("../helper/check_existence.helper.js");

exports.createFooter = async (req, res, next) => {
    try {
        const existingFooter = await Footer.findOne({ where: { page: req.body.page } });
        dataExist(existingFooter, vars.EXISTS_FOOTER, statusCodeVars.BADREQUEST)
        const footer = await Footer.create(req.body);
        setCacheData(vars.FOOTER_CACHE_KEY, footer)
        return responseGenerator(res, vars.CREATE_FOOTER, statusCodeVars.CREATED, footer);
    } catch (error) {
        next(error)
    };
}

exports.getFooter = async (req, res, next) => {
    try {
        const footerData = await getCacheData(vars.FOOTER_CACHE_KEY)
        let allDataParse = JSON.parse(footerData);
        console.log("redis");
        if (!allDataParse) {
            const footer = await Footer.findOne();
            parseIfString(footer.dataValues ?? {}, ['footerlinks', 'socialMedia', 'branches'])
            allDataParse = footer
            await setCacheData(vars.FOOTER_CACHE_KEY, footer)
            console.log("database");
        }
        return responseGenerator(res, vars.FATCHED_FOOTER, statusCodeVars.OK, allDataParse);
    } catch (error) {
        next(error)
    }
};


exports.updateFooterById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedFooterData = req.body;
        const existingFooter = await Footer.findOne({ where: { id: id } })
        dataNotExist(existingFooter, vars.NOT_EXIST_FOOTER, statusCodeVars.NOT_FOUND)
        await Footer.update(updatedFooterData, { where: { id: id } })
        await deleteCacheData(vars.FOOTER_CACHE_KEY)
        await setCacheData(vars.FOOTER_CACHE_KEY, updatedFooterData)
        return responseGenerator(res, vars.UPDATA_FOOTER, statusCodeVars.OK, updatedFooterData);
    }
    catch (error) {
        next(error)
    }
}

exports.deleteFooter = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteCacheData(id);
        const result = await Footer.destroy({
            where: { id: id }
        });
        if (result === 0) {
            return responseGenerator(res, vars.NOT_EXIST_FOOTER, statusCodeVars.NOT_FOUND, "error")
        }
        return responseGenerator(res, vars.DELETE_FOOTER, statusCodeVars.OK, result);
    } catch (error) {
        next(error);
    }
}