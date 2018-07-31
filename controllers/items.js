const itemsModel = require('../models/items');

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
        console.log(req.body.total_price);
        itemsModel.create(req.body)
            .then(result => res.json({ success: true, message: 'Successfully created food item' }))
            .catch(err => res.json({ success: false, message: err.message }))
    },
    Update: (req, res) => {
        req.body.total_price = Number(req.body.price) * Number(req.body.count);
        itemsModel.findByIdAndUpdate(req.params.id, req.body)
            .then(result => res.json({ success: true, message: 'Successfully updated food item' }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
    delete: (req, res) => {
        itemsModel.findByIdAndRemove(req.params.id)
            .then(result => res.json({ success: true, message: 'Successfully deleted food item' }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
}
