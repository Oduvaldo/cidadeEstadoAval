const jwtService = require('./lib/jwtService');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

module.exports = (args = {}) => {
    try {
        if (!args.authorization) throw ThrowStringException.validationError('INVALID_AUTHORIZATION')

        let authorization = args.authorization.split(' ');

        if (authorization.length < 2) throw ThrowStringException.validationError('INVALID_AUTHORIZATION');

        authorization = authorization[1];

        return jwtService.verify(authorization, process.env.TOKEN_KEY_SECRET);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') throw ThrowStringException.validationError('INVALID_TOKEN');
        if (error.name === 'TokenExpiredError') throw ThrowStringException.validationError('EXPIRED_TOKEN');

        if (error.indexOf('VALIDATION_ERROR:') >= 0) { throw error };

        throw error;
    }
}