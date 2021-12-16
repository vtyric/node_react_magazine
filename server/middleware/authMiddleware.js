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
                next(ApiError.notAuthorized());
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (role === undefined || decoded.role === role) {
                request.user = decoded;
                next();
            } else {
                next(ApiError.notAuthorized());
            }
        } catch (e) {
            return next(ApiError.notAuthorized());
        }
    };
}
