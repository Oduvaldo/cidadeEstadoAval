const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    abbreviation: {
        type: String,
        required: true,
        unique: true,
    },
    insertDate: {
        type: Date,
        required: true,
    },
    updateDate: {
        type: Date,
    },
});

const model = mongoose.model('STATE', schema, 'STATE');

module.exports = {
    schema,
    model,
}