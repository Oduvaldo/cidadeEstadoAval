const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Logger = require('../util/logger');

const connect = async (stringConnection) => {
    if (!stringConnection) throw `MONGO_DB - NO_CONFIGURATION`;

    try {
        Logger.info(`MONGO_DB - CONNECTING - ${stringConnection}`);

        await mongoose.connect(stringConnection, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        Logger.info(`MONGO_DB - CONNECTION_ON`);
    } catch (error) {
        Logger.info(`MONGO_DB - CONNECTION_ON_FAIL : ${error}`);
        throw `MONGO_DB`;
    }
}

const disconnect = async () => {
    try {
        await mongoose.disconnect();
        Logger.info(`MONGO_DB - CONNECTION_OFF`);
    } catch (error) {
        Logger.info(`MONGO_DB - CONNECTION_OFF_FAIL : ${error}`);
        throw `MONGO_DB`;
    }
}

module.exports = {
    connect,
    disconnect,
}