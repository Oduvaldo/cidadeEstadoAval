const State = require('../model/state');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

const validateArgs = (args) => {
    if (!args.name) ThrowStringException.validationError('INVALID_NAME');
    if (!args.abbreviation) ThrowStringException.validationError('INVALID_ABBREVIATION');
}

module.exports = async (args = {}) => {
    validateArgs(args);

    try {
        const state = {
            ...args,
            insertDate: new Date(),
        };

        delete state._id;
        delete state.updateDate;

        return await State.model.create(state);
    } catch (error) {
        if (error.name && error.name === 'MongoError') {
            if (error.code && error.code === 11000) ThrowStringException.constraintError('DUPLICATED_STATE');
        }

        Logger.error(`STATE_SERVICE_INSERT: ${error}`);
        throw `STATE_SERVICE_INSERT`;
    }
}