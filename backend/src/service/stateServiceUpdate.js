const mongoose = require('mongoose');

const State = require('../model/state');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

const validateArgs = (args) => {
    if (!args.idState) ThrowStringException.validationError('INVALID_IDSTATE');
    if (!args.name) ThrowStringException.validationError('INVALID_NAME');
    if (!args.abbreviation) ThrowStringException.validationError('INVALID_ABBREVIATION');
}

module.exports = async (args = {}) => {
    validateArgs(args);

    try {
        const query = {
            _id: mongoose.Types.ObjectId(args.idState),
        };

        const update = {
            $set: {
                ...args,
                updateDate: new Date(),
            },
        };

        delete update.$set._id;
        delete update.$set.insertDate;

        return await State.model.updateOne(query, update);
    } catch (error) {
        if (error.name && error.name === 'MongoError') {
            if (error.code && error.code === 11000) ThrowStringException.validationError('DUPLICATED_STATE');
        }

        Logger.error(`STATE_SERVICE_UPDATE: ${error}`);
        throw `STATE_SERVICE_UPDATE`;
    }
}