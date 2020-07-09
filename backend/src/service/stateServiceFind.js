const mongoose = require('mongoose');

const State = require('../model/state');

const Logger = require('../util/logger');

module.exports = async (args = {}) => {
    try {
        const aggregate = [];

        if (args.idState) aggregate.push({
            $match: {
                _id: mongoose.Types.ObjectId(args.idState),
            }
        });

        if (args.search) aggregate.push({
            $match: {
                $or: [
                    { name: { $regex: args.search, $options: 'i' } },
                    { abbreviation: { $regex: args.search, $options: 'i' } }
                ]
            }
        });

        aggregate.push({
            $project: {
                _id: 0,
                idState: '$_id',
                name: '$name',
                abbreviation: '$abbreviation',
            }
        });

        aggregate.push({
            $sort: {
                name: 1,
            }
        });

        Logger.debug(() => (`STATE_SERVICE_FIND: ${JSON.stringify(aggregate)}`));

        return await State.model.aggregate(aggregate);
    } catch (error) {
        Logger.error(`STATE_SERVICE_FIND: ${error}`);
        throw `STATE_SERVICE_FIND`;
    }
}
