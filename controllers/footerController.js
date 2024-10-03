const Footer = require("../models/Footer");
const responseGenerator = require('../helper/functions.helper.js')
const { vars } = require('../server/constants.js');
const { statusCodeVars } = require('../server/statusCode.js');
const { setCacheData, getCacheData } = require("../helper/redis.helper.js");
const { dataExist } = require("../helper/check_existence.helper.js");

exports.createFooter = async (req, res, next) => {
    try {
        let { title, footerlinks, socialMedia, branches, page, section } = req.body;
        page = page.trim()
        const existingFooter = await Footer.findOne({ where: { page } });
        dataExist(existingFooter, vars.EXISTS_FOOTER, statusCodeVars.BADREQUEST)
        const footer = await Footer.create({ title, footerlinks: footerlinks, socialMedia: socialMedia, branches: branches, page, section });
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
        if (!allDataParse) {
            const footer = await Footer.findOne();
            footer.dataValues.footerlinks = typeof footer.footerlinks == "string" ? JSON.parse(footer.footerlinks) : footer.footerlinks
            footer.dataValues.socialMedia = typeof footer.socialMedia == "string" ? JSON.parse(footer.socialMedia) : footer.socialMedia
            footer.dataValues.branches = typeof footer.branches == "string" ? JSON.parse(footer.branches) : footer.branches
            allDataParse = footer
            await setCacheData(vars.FOOTER_CACHE_KEY, footer)
        }
        return responseGenerator(res, vars.FATCHED_FOOTER, statusCodeVars.OK, allDataParse);
    } catch (error) {
        next(error)
    }
};


