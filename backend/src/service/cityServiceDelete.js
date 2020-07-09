const mongoose = require('mongoose');

const City = require('../model/city');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

const validateArgs = (args) => {
    if (!args.idCity) ThrowStringException.validationError('INVALID_IDCITY');
}

module.exports = async (args = {}) => {
    validateArgs(args);

    try {
        const query = {
            _id: mongoose.Types.ObjectId(args.idCity),
        };

        return await City.model.deleteOne(query);
    } catch (error) {
        Logger.error(`CITY_SERVICE_REMOVE: ${error}`);
        throw `CITY_SERVICE_REMOVE`;
    }
}