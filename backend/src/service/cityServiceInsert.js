const City = require('../model/city');
const State = require('../model/state');

const cityServiceCount = require('./cityServiceCount');

const ThrowStringException = require('../util/throwStringException');
const Logger = require('../util/logger');

const validateArgs = (args) => {
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
        if ((await cityServiceCount({ idState: args.state.idState, name: args.name, })) > 0) { 
            ThrowStringException.constraintError('DUPLICATED_CITY'); 
        }

        const state = await getState(args.state.idState);

        const city = {
            ...args,
            idState: state._id,
            insertDate: new Date(),
        };

        delete state._id;
        delete state.updateDate;

        return await City.model.create(city);
    } catch (error) {
        if (error.indexOf('CONSTRAINT_ERROR:') >= 0) { throw error };

        Logger.error(`CITY_SERVICE_INSERT: ${error}`);
        throw `CITY_SERVICE_INSERT`;
    }
}