const AuthenticationService = require('../../../service/authenticationService');

const Response = require('../response/response');

module.exports = (req, res, next) => {
    try {
        AuthenticationService.tokenVerify(req.headers);
        next();
    } catch (error) {
        Response.error(req, res, error);
    }
}
