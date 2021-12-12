const ApiError = require('../error/ApiError');

module.exports = (error, request, response, next) =>
    error instanceof ApiError
        ? response.status(error.status).json({message: error.message})
        : response.status(500).json({message: "Непредвиденная ошибка!"})
