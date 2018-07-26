const
    mongoose = require('mongoose'),
    SchemaTypes = mongoose.SchemaTypes;

let RecipeSchema = new mongoose.Schema({
    name: String,
    desc: String,
    items: [{
        itemid: { type: mongoose.Schema.Types.ObjectId, ref: 'Items' },
        quantity: Number,
        unit: String,
    }]
}, {
    timestamps: {
        createdAt: 'date_added',
        updatedAt: 'date_lastmodified'
    }
})

module.exports = mongoose.model('Recipes', RecipeSchema);