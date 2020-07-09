const mongoose = require('mongoose');

const State = require('../model/state');
const City = require('../model/city');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

const validateArgs = (args) => {
    if (!args.idCity) ThrowStringException.validationError('INVALID_IDCITY');
    if (!args.name) ThrowStringException.validationError('INVALID_NAME');
    if (!args.state || !args.state.idState) ThrowStringException.validationError('INVALID_ID_STATE');
}

const getState = async (idState) => {
    const result = await State.model.findById(idState);

    if (!result) ThrowStringException.validationError('INVALID_ID_STATE');

    return result;
}

module.exports = async (args = {}) => {
    validateArgs(args);

    try {
        const state = await getState(args.state.idState);

        const query = {
            _id: mongoose.Types.ObjectId(args.idCity),
        };

        const update = {
            $set: {
                ...args,
                idState: state._id,
                updateDate: new Date(),
            },
        };

        delete update.$set._id;
        delete update.$set.insertDate;

        return await City.model.updateOne(query, update);
    } catch (error) {
        Logger.error(`CITY_SERVICE_UPDATE: ${error}`);
        throw `CITY_SERVICE_UPDATE`;
    }
}