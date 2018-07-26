const recipesModel = require('../models/recipes');

module.exports = {
    index: (req, res) => {
        recipesModel.find({})
            .then(results => res.json({ success: true, results }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },

    getOne: (req, res) => {
        recipesModel.findById(req.params.id).populate('items').exec()
            .then(result => res.json({ success: true, result }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },

    create: (req, res) => {
        req.body.items = Array.from(req.body.items)
        recipesModel.create(req.body)
            .then(result => res.json({ success: true, message: 'Successfully created recipe' }))
            .catch(err => res.json({ success: false, err }))
    },
    Update: (req, res) => {
        recipesModel.findByIdAndUpdate(req.params.id, req.body)
            .then(result => res.json({ success: true, message: 'Successfully updated recipe' }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
    delete: (req, res) => {
        recipesModel.findByIdAndRemove(req.params.id)
            .then(result => res.json({ success: true, message: 'Successfully deleted recipe' }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
}