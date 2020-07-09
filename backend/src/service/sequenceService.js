const Sequence = require('../model/sequence');

const Logger = require('../util/logger');

const getValue = async (sequenceKey) => {
    try {
        const result = await Sequence.model.findOneAndUpdate({
            key: sequenceKey,
        }, {
            $inc: {
                value: 1,
            },
        }, {
            new: true,
            upsert: true,
        });

        return result.value;
    } catch (error) {
        Logger.error(`SEQUENCE_SERVICE_GET_VALUE: ${error}`);
        throw `SEQUENCE_SERVICE_GET_VALUE`;
    }
}

module.exports = {
    getCityValue: async () => (await getValue(Sequence.key.CITY)),
    getStateValue: async () => (await getValue(Sequence.key.STATE)),
}
