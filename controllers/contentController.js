const { dataExist } = require('../helper/check_existence.helper');
const { responseGenerator, parseIfString } = require('../helper/functions.helper');
const { getCacheData, setCacheData, deleteCacheData } = require('../helper/redis.helper');
const { UploadFile } = require('../Middleware/multerConfig');
const Content = require('../models/Content');
const { vars } = require('../server/constants');
const { statusCodeVars } = require('../server/statusCode');


exports.createContent = async (req, res, next) => {
    try {
        const uploadedFiles = await UploadFile(req, 'content'); 
        const existingheaderContent = await Content.findOne({ where: { index: req.body.index } });
        dataExist(existingheaderContent, vars.EXISTS_CONTENT, statusCodeVars.BADREQUEST);

        if (uploadedFiles.file && uploadedFiles.file.length) {
            req.body.featuredMedia = uploadedFiles.file.map(file => file.path); 
        }

        const content = await Content.create(req.body);
        await deleteCacheData(req.body.id, vars.CONTENT_CACHE_KEY);
        return responseGenerator(res, vars.CREATE_CONTENT, statusCodeVars.CREATED, content);
    } catch (error) {
        next(error);
    }
};


exports.getAllContent = async (req, res, next) => {
    try {
        // const filter = req.params.pagename;
        await deleteCacheData(vars.CONTENT_CACHE_KEY)
        let contentData = await getCacheData(vars.CONTENT_CACHE_KEY);
        if (contentData) {
            console.log("redis");
            return responseGenerator(res, vars.FATCHED_CONTENT, statusCodeVars.OK, JSON.parse(contentData));
        }
        console.log("mysql");
        contentData = await Content.findAll();
        const contentDataAll = contentData.map(({ dataValues }) =>
            parseIfString(dataValues ?? {}, ['featuredMedia', 'logos', 'lists', 'navigationMenus'])
        );
        await setCacheData(vars.CONTENT_CACHE_KEY, contentDataAll);
        return responseGenerator(res, vars.FATCHED_CONTENT, statusCodeVars.OK, contentDataAll);
    } catch (error) {
        next(error);
    }
};


exports.getContentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let contentData = await getCacheData(id);
        if (contentData) {
            console.log("redis");
            return responseGenerator(res, vars.FATCHED_CONTENT, statusCodeVars.OK, JSON.parse(contentData));
        }
        console.log("mysql");
        contentData = await Content.findOne({ where: { id: id } });
        const content = parseIfString(contentData.dataValues ?? {}, ['featuredMedia', 'logos', 'lists', 'navigationMenus'])
        await setCacheData(id, content);
        return responseGenerator(res, vars.FATCHED_CONTENT, statusCodeVars.OK, content);
    } catch (error) {
        next(error);
    }
};

exports.updateContentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        await Content.update(updatedData, {
            where: { id: id },
        });
        await deleteCacheData(id)
        await setCacheData(id, updatedData);
        return responseGenerator(res, vars.UPDATA_CONTENT, statusCodeVars.OK, updatedData);
    } catch (error) {
        next(error);
    }
};


exports.deleteContentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await deleteCacheData(id);
        console.log(data);
        dataExist(data, vars.NOT_EXIST_CONTENT, statusCodeVars.NOT_FOUND);
        const result = await Content.destroy({
            where: { id: id },
        });
        if (result === 0) {
            return responseGenerator(res, vars.NOT_EXIST_CONTENT, statusCodeVars.NOT_FOUND, "error");
        }
        return responseGenerator(res, vars.DELETE_CONTENT, statusCodeVars.OK, result);
    } catch (error) {
        next(error);
    }
};


exports.getContentByPageName = async (req, res, next) => {
    try {
      const pageName = req.params.pageName;
      await deleteCacheData(pageName);
      let contentData = await getCacheData(pageName);
      if (contentData) {
        console.log("redis");
        return responseGenerator(
          res,
          vars.FATCHED_CONTENT,
          statusCodeVars.OK,
          JSON.parse(contentData)
        );
      }
      console.log("mysql");
      contentData = await Content.findAll({ where: { page: pageName } });
      const contentDataAll = contentData.map(({ dataValues }) =>
        parseIfString(dataValues ?? {}, [
          "featuredMedia",
          "logos",
          "lists",
          "navigationMenus",
        ])
      );
      await setCacheData(pageName, contentDataAll);
      return responseGenerator(
        res,
        vars.FATCHED_CONTENT,
        statusCodeVars.OK,
        contentDataAll
      );
    } catch (error) {
      next(error);
    }
  };


