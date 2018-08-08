const mongoose = require('mongoose'),
    SchemaTypes = mongoose.SchemaTypes;

let FoodSchema = new mongoose.Schema({
    name: String,
    imageurl: String,
    price: Number,

}, {
    timestamps: {
        createdAt: 'date_added',
        updatedAt: 'date_lastmodified'
    }
})

module.exports = mongoose.model('Foods', FoodSchema)