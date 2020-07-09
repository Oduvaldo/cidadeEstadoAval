const mongoose = require('mongoose');

const stateServiceFind = require('./stateServiceFind');

const City = require('../model/city');

const Logger = require('../util/logger');

module.exports = async (args = {}) => {
    try {
        const aggregate = [];

        if (args.idCity) aggregate.push({
            $match: {
                _id: mongoose.Types.ObjectId(args.idCity),
            }
        });

        if (args.search) {
            let states = await stateServiceFind({ search: args.search });
            states = states.map(state => ({ idState: state.idState }));

            const inStates = [];

            states.forEach(state => {
                inStates.push(state.idState);
            });

            console.log(JSON.stringify(inStates));

            aggregate.push({
                $match: {
                    $or: [
                        { name: { $regex: args.search, $options: 'i' } },
                        { idState: { $in: inStates } }
                    ],
                }
            });
        }

        aggregate.push({
            $lookup:
            {
                from: 'STATE',
                localField: 'idState',
                foreignField: '_id',
                as: 'state',
            }
        });

        aggregate.push({
            $unwind: '$state'
        });

        aggregate.push({
            $project: {
                _id: 0,
                idCity: '$_id',
                name: '$name',
                state: {
                    idState: '$state._id',
                    name: '$state.name',
                    abbreviation: '$state.abbreviation',
                },
            }
        });

        aggregate.push({
            $sort: {
                'state.name': 1,
                'name': 1,
            }
        });

        Logger.debug(() => (`CITY_SERVICE_FIND: ${JSON.stringify(aggregate)}`));

        return await City.model.aggregate(aggregate);
    } catch (error) {
        Logger.error(`CITY_SERVICE_FIND: ${error}`);
        throw `CITY_SERVICE_FIND`;
    }
}
