const jwt = require('jsonwebtoken');

const sign = (obj, secret, options) => {
    return jwt.sign({ ...obj }, secret, { ...options });
}

const verify = (message, secret) => {
    return jwt.verify(message, secret);
}

module.exports = {
    sign,
    verify,
}