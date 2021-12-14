const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

module.exports = function (role) {
    return function (request, response, next) {
        if (request.method === "OPTIONS") {
            next();
        }
        try {
            const token = request.headers.authorization.split(' ')[1];
            if (!token) {
                return next(ApiError.notAuthorized());
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== role) {
                return next(ApiError.notAuthorized());
            }
            request.user = decoded;
            next();
        } catch (e) {
            return next(ApiError.notAuthorized());
        }
    };
}
