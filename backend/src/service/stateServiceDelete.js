const mongoose = require('mongoose');

const State = require('../model/state');

const cityServiceCount = require('./cityServiceCount');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

const validateArgs = (args) => {
    if (!args.idState) ThrowStringException.validationError('INVALID_IDSTATE');
}

module.exports = async (args = {}) => {
    validateArgs(args);

    try {
        if ((await cityServiceCount(args)) > 0) { ThrowStringException.constraintError('THERE_ARE_CITIES'); }

        const query = {
            _id: mongoose.Types.ObjectId(args.idState),
        };

        return await State.model.deleteOne(query);
    } catch (error) {
        if (error.indexOf('CONSTRAINT_ERROR:') >= 0) { throw error };

        Logger.error(`STATE_SERVICE_REMOVE: ${error}`);
        throw `STATE_SERVICE_REMOVE`;
    }
}