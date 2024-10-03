const Navbar = require('../models/Navbar');
const responseGenerator = require('../helper/functions.helper.js')
const { vars } = require('../server/constants.js');
const { statusCodeVars } = require('../server/statusCode.js');
const { setCacheData, getCacheData } = require('../helper/redis.helper.js');
const { dataExist } = require('../helper/check_existence.helper.js');

exports.createNavbar = async (req, res, next) => {
    try {
        let { logo, href, label, page, section, links } = req.body;
        page = page.trim();
        const existingNavbar = await Navbar.findOne({ where: { page } });
        dataExist(existingNavbar, vars.EXISTS_NAVBAR, statusCodeVars.BADREQUEST)
        const navbar = await Navbar.create({ logo, href, label, page, section, links: links });
        setCacheData(vars.NAVBAR_CACHE_KEY, navbar);
        return responseGenerator(res, vars.CREATE_NAVBAR, statusCodeVars.CREATED, navbar);
    } catch (error) {
        next(error)
    }
};
/**
 * @param request empty
 * @param response Navbar JSON return
 */

exports.getNavbar = async (req, res, next) => {
    try {
        const navbardata = await getCacheData(vars.NAVBAR_CACHE_KEY)
        let allDataParse = JSON.parse(navbardata)
        if (!allDataParse) {
            const navbar = await Navbar.findOne();
            navbar.dataValues.links = typeof navbar.links == "string" ? JSON.parse(navbar.links) : navbar.links
            allDataParse = navbar
            await setCacheData(vars.NAVBAR_CACHE_KEY, navbar);
        }
        return responseGenerator(res, vars.FATCHED_NAVBAR, statusCodeVars.OK, allDataParse);
    } catch (error) {
        next(error);
    }
}

/**
 * @param request empty
 * @param response Navbar JSON return
 */

exports.getAllPages = async (req, res, next) => {
    try {
        const page = await Navbar.findOne({ attributes: ["links"] });

        const parserData = JSON.parse(page.links).map(link => {
            if (link.subLinks && link.subLinks.length > 0) {
                return link.subLinks.map(sublink => sublink.title);
            }
            return null
        });

        // flat() function use for merge multiple array convert a single array
        const filteredData = parserData.flat().filter(title => title);
        return responseGenerator(res, vars.FATCHED_PAGES, statusCodeVars.OK, filteredData);
    } catch (error) {
        next(error);
    }
};

