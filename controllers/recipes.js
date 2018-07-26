const Recipes = require('../models/recipes');

module.exports = {
    index: (req, res) => {
        Recipes.find({}).populate('items.id')
            .then(results => res.json({ success: true, results }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },

    getOne: (req, res) => {
        Recipes.findById(req.params.id).populate('items.id')
            .then(result => res.json({ success: true, result }))
            .catch(err => res.json({ success: false, message: err }))
    },

    create: (req, res) => {
        console.log(req.body)

        Recipes.create(req.body)
            .then(result => res.json({ success: true, message: 'Successfully created recipe' }))
            .catch(err => res.json({ success: false, err }))
    },
    Update: (req, res) => {
        Recipes.findByIdAndUpdate(req.params.id, req.body)
            .then(result => res.json({ success: true, message: 'Successfully updated recipe' }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
    delete: (req, res) => {
        Recipes.findByIdAndRemove(req.params.id)
            .then(result => res.json({ success: true, message: 'Successfully deleted recipe' }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
}