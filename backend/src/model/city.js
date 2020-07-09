const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    idState: {
        type: Schema.Types.ObjectId,
        ref: 'STATE',
        required: true,
    },
    insertDate: {
        type: Date,
        required: true,
    },
    updateDate: {
        type: Date,
    },
});

const model = mongoose.model('CITY', schema, 'CITY');

module.exports = {
    schema,
    model,
}