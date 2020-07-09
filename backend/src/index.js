require('dotenv').config();

process.env.PORT = process.env.PORT || 3000;
process.env.CONTEXT = process.env.CONTEXT || '';

const mongoDB = require('./config/mongoDB');

const Logger = require('./util/logger');

const run = async () => {
    Logger.info(`BACKEND: START`);

    try {
        await mongoDB.connect(process.env.MONGODB_HOST);

        require('./controller/server');
    } catch (error) {
        Logger.error(`BACKEND: ${error}`);
        process.exit(1);
    }
}

run();
