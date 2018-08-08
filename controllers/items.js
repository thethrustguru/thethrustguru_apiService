const itemsModel = require('../models/items');
const Logger = require('../models/logger');
const SchemaTypes = require('mongoose').SchemaTypes;

module.exports = {
    index: (req, res) => {
        itemsModel.find({})
            .then(results => res.json({ success: true, results }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },

    getOne: (req, res) => {
        itemsModel.findById(req.params.id)
            .then(result => res.json({ success: true, result }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },

    create: (req, res) => {
        req.body.total_price = Number(req.body.price) * Number(req.body.count);

        itemsModel.create(req.body)
            .then(result => {
                Logger.create({
                        userId: SchemaTypes.ObjectId(req.user._id),
                        action: 'Created new food item ' + result._id
                    })
                    .then(result => {

                        res.json({ success: true, message: 'Successfully created food item', id: result._id })
                    }).catch(err => res.json(err));

            })
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
    Update: (req, res) => {
        req.body.total_price = Number(req.body.price) * Number(req.body.count);
        itemsModel.findByIdAndUpdate(req.params.id, req.body)
            .then(result => {
                Logger.create({
                        userId: SchemaTypes.ObjectId(req.user._id),
                        action: 'Upddated food item ' + result._id
                    })
                    .then(result => {

                        res.json({ success: true, message: 'Successfully updated food item' })
                    }).catch(err => res.json(err));


            })
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
    delete: (req, res) => {
        itemsModel.findByIdAndRemove(req.params.id)
            .then(result => {
                Logger.create({
                        userId: SchemaTypes.ObjectId(req.user._id),
                        action: 'Deleted food item ' + result._id
                    })
                    .then(result => {

                        res.json({ success: true, message: 'Successfully deleted food item' })
                    }).catch(err => res.json(err));


            })
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
}