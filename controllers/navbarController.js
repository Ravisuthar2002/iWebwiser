const Navbar = require('../models/Navbar');
const { responseGenerator } = require('../helper/functions.helper.js')
const { vars } = require('../server/constants.js');
const { statusCodeVars } = require('../server/statusCode.js');
const { setCacheData, getCacheData, deleteCacheData } = require('../helper/redis.helper.js');
const { dataExist, dataNotExist } = require('../helper/check_existence.helper.js');

exports.createNavbar = async (req, res, next) => {
    try {
        const existingNavbar = await Navbar.findOne({ where: { page: req.body.page } });
        dataExist(existingNavbar , vars.EXISTS_NAVBAR, statusCodeVars.BADREQUEST)
        const navbar = await Navbar.create(req.body);
        await deleteCacheData(vars.NAVBAR_CACHE_KEY)
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
            await deleteCacheData(vars.NAVBAR_CACHE_KEY)
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

        // let parser = JSON.parse(page.links)
        // flat() function use for merge multiple array convert a single array
        const filteredData = parserData.flat().filter(title => title);
        return responseGenerator(res, vars.FATCHED_PAGES, statusCodeVars.OK, filteredData);
    } catch (error) {
        next(error);
    }
};



exports.updataNavbar = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updataNavbarData = req.body;
        const existingNavbar = await Navbar.findOne({ where: { id: id } });
        dataNotExist(existingNavbar, vars.NOT_EXIST_NAVBAR, statusCodeVars.NOT_FOUND)
        await Navbar.update(updataNavbarData, { where: { id: id } });
        await deleteCacheData(vars.NAVBAR_CACHE_KEY);
        await setCacheData(vars.NAVBAR_CACHE_KEY, updataNavbarData);
        return responseGenerator(res, vars.UPDATA_NAVBAR, statusCodeVars.OK, updataNavbarData);
    } catch (error) {
        next(error);
    }
};



exports.deleteNavbar = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteCacheData(id);
        const result = await Navbar.destroy({
            where: { id: id }
        });
        if (result === 0) {
            return responseGenerator(res, vars.NOT_EXIST_NAVBAR, statusCodeVars.NOT_FOUND, "error")
        }
        return responseGenerator(res, vars.DELETE_NAVBAR, statusCodeVars.OK, result);
    } catch (error) {
        next(error);
    }
}