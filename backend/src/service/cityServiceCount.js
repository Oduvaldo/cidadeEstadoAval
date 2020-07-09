const mongoose = require('mongoose');

const stateServiceFind = require('./stateServiceFind');

const City = require('../model/city');

const Logger = require('../util/logger');

module.exports = async (args = {}) => {
    try {
        const aggregate = [];

        const match = {};

        if (args.idState) {
            match.idState = mongoose.Types.ObjectId(args.idState);
        }
        if (args.name) {
            match.name = { $regex: args.name, $options: 'i' };
        }

        aggregate.push({
            $match: match,
        });

        // if (args.idState) aggregate.push({
        //     $match: {
        //         idState: mongoose.Types.ObjectId(args.idState),
        //     }
        // });

        aggregate.push({ $count: 'count' });

        Logger.debug(() => (`CITY_SERVICE_COUNT: ${JSON.stringify(aggregate)}`));

        const result = await City.model.aggregate(aggregate);

        return result && result.length > 0 ? result[0].count : 0;
    } catch (error) {
        Logger.error(`CITY_SERVICE_COUNT: ${error}`);
        throw `CITY_SERVICE_COUNT`;
    }
}
