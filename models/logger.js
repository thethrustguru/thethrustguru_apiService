const
    mongoose = require('mongoose'),
    SchemaTypes = mongoose.SchemaTypes;

let LoggerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String,

}, {
    timestamps: {
        createdAt: 'date_added',
        updatedAt: 'date_lastmodified'
    }
})

module.exports = mongoose.model('Logger', LoggerSchema);