const jwtService = require('./lib/jwtService');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

const getEnvUsers = () => {
    const envUsers = {};

    process.env.USERS_ALLOWED.split(',').forEach(user => {
        const [login, password] = user.split(':');
        envUsers[login] = password;
    });

    return envUsers;
}

module.exports = (args = {}) => {
    try {
        if (!args.authorization) throw ThrowStringException.validationError('INVALID_AUTHORIZATION');

        const envUsers = getEnvUsers();

        let authorization = args.authorization.split(' ');

        if (authorization.length < 2) throw ThrowStringException.validationError('INVALID_AUTHORIZATION');

        authorization = authorization[1];
        authorization = Buffer.from(authorization, 'base64').toString('utf8');

        const [login, password] = authorization.split(':');

        if (!envUsers[login] || envUsers[login] !== password) throw ThrowStringException.validationError('INVALID_LOGIN');

        return jwtService.sign({ login }, process.env.TOKEN_KEY_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });
    } catch (error) {
        if (error.indexOf('VALIDATION_ERROR:') >= 0) { throw error };

        Logger.error(`AUTHENTICATION_SERVICE_LOGIN: ${error}`);
        throw `AUTHENTICATION_SERVICE_LOGIN`;
    }
}