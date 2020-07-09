const moment = require('moment');

const getDate = () => {
    return moment(new Date()).format('YYYY/MM/DD HH:mm:ss');
}

const buildMessage = (title = '', msg = '') => {
    console.log(`${getDate()} - ${title} - ${msg}`);
}

const info = (msg = '') => {
    buildMessage('INFO', msg);
}

const error = (msg = '') => {
    buildMessage('ERROR', msg);
}

const warn = (msg = '') => {
    buildMessage('WARN', msg);
}

const debug = (msgFunction) => {
    if ('DEBUG' === process.env.NODE_ENV) {
        buildMessage('DEBUG', msgFunction());
    }
}

const infoRequestRoute = (request) => {
    info(`${request.method}: ${request.originalUrl}`);
}

module.exports = {
    info,
    error,
    warn,
    debug,

    infoRequestRoute,
}
