const dataExist = (model, message, statuscode) => {
    if (model) {
        const error = new Error(message);
        error.statusCode = statuscode;
        throw error
    }
}

const dataNotExist = (model, message, statuscode) => {
    if (!model) {
        const error = new Error(message);
        error.statusCode = statuscode;
        throw error
    }
}

module.exports = { dataExist, dataNotExist }