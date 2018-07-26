const mongoose = require('mongoose'),
    SchemaTypes = mongoose.SchemaTypes;

let ItemSchema = new mongoose.Schema({
    name: String,
    desc: String,
    price: Number,
    count: Number,
    total_price: Number
}, {
    timestamps: {
        createdAt: 'date_added',
        updatedAt: 'date_lastmodified'
    }
})

module.exports = mongoose.model('Items', ItemSchema)