const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function (request, response, next) {
    if (request.method === "OPTIONS") {
        next();
    }
    try {
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            return next(ApiError.notAuthorized());
        }
        request.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (e) {
        return next(ApiError.notAuthorized());
    }
};
