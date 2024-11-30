const { dataExist } = require("../helper/check_existence.helper");
const { responseGenerator } = require("../helper/functions.helper");
const ConsultanForm = require("../models/ConsultantForm");
const { vars } = require("../server/constants");
const { statusCodeVars } = require("../server/statusCode");

exports.createConsultanForm = async (req, res, next) => {
    try {
        const { name, email, phone_number, company, message } = req.body;
        const existingForm = await ConsultanForm.findOne({ where: { email, phone_number } });
        dataExist(existingForm, vars.EXISTS_CONSULTANFORM, statusCodeVars.BADREQUEST)
        if (!name || !email || !phone_number || !company || !message) {
            responseGenerator(res, vars.REQUIRED_ALL_FIELDS, statusCodeVars.BADREQUEST, null)
        }
        const newConsultanForm = await ConsultanForm.create({
            name,
            email,
            phone_number,
            company,
            message
        });
        responseGenerator(res, vars.CREATE_CONSULTANFORM, statusCodeVars.CREATED, newConsultanForm)
    } catch (error) {
        next(error)
    }
};

exports.getConsultanForm = async (req, res, next) => {
    try {
        const data = await ConsultanForm.findAll()
        responseGenerator(res, "get consultan form data", statusCodeVars.OK, data)
    } catch (error) {
        next(error)
    }
};



exports.getConsultanFormById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await ConsultanForm.findOne({ where: { id: id } })
        responseGenerator(res, "get consultanform data by id ", statusCodeVars.OK, data)
    } catch (error) {
        next(error)
    }
};


exports.updateConsultanForm = async (req, res, next) => {
    try {
        const id = req.params.id;

        const { name, email, phone_number, company, message } = req.body;
        if (!name || !email || !phone_number || !company || !message) {
            return responseGenerator(res, vars.REQUIRED_ALL_FIELDS, statusCodeVars.BADREQUEST, null);
        }
        await ConsultanForm.update({
            name,
            email,
            phone_number,
            company,
            message
        }, { where: { id: id } });
        responseGenerator(res, vars.UPDATA_CONSULTANFORM, statusCodeVars.OK, req.body);
    } catch (error) {
        next(error);
    }
};


exports.deleteConsultanForm = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await ConsultanForm.destroy({ where: { id: id } });
        if (result === 0) {
            return responseGenerator(res, vars.NOT_EXIST_CONTENT, statusCodeVars.NOT_FOUND, "error");
        }
        responseGenerator(res, vars.DELETE_CONSULTANFORM, statusCodeVars.OK, null);
    } catch (error) {
        next(error);
    }
};
