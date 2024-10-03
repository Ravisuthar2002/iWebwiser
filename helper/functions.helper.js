const responseGenerator = (res, message, statusCode, data) => {
    return res.status(statusCode).json({
        message,
        statusCode,
        data,
        status: true
    })
}



module.exports = responseGenerator;