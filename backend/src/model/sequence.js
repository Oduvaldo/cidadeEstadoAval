const mongoose = require('mongoose')
const Schema = mongoose.Schema

const key = {
    CITY: 'CITY',
    STATE: 'STATE',
}

const schema = new Schema({
    key: {
        required: true,
        type: String,
        enum: [key.CITY, key.STATE,]
    },

    value: {
        required: true,
        type: Number,
        default: 0,
    },
});

const model = mongoose.model('SEQUENCE', schema, 'SEQUENCE');

module.exports = {
    key,
    schema,
    model,
}