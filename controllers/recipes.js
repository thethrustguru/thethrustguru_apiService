const Recipes = require('../models/recipes');
const Item = require('../models/items');
const Logger = require('../models/logger');
const SchemaTypes = require('mongoose').SchemaTypes;

module.exports = {
    index: (req, res) => {
        Recipes.find({}).populate('items.itemId')
            .then(results => res.json({ success: true, results }))
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },

    getOne: (req, res) => {

        Recipes.findById(req.params.id).populate('items.itemId')
            .then(result => res.json({ success: true, result }))
            .catch(err => res.json({ success: false, message: err }))
    },

    create: (req, res) => {
        // console.log(req.user)
        //console.log(req.body.items)
        let foodItems = req.body.items;
        foodItems.forEach(foodItem => {
            // console.log(foodItem.itemId);
            Item.findById(foodItem.itemId).then(item => {
                // console.log(item);
                item.count -= foodItem.quantity;
                item.total_price = item.count * item.price;
                item.save();
            })
        });
        Recipes.create(req.body)
            .then(recipe => {
                // console.log(recipe)
                Logger.create({
                        userId: SchemaTypes.ObjectId(req.user._id),
                        action: 'Created new recipes ' + recipe._id
                    })
                    .then(result => {
                        console.log(result)
                        res.json({ success: true, message: 'Successfully created recipe', id: recipe._id })
                    }).catch(err => res.json(err));
            })
            .catch(err => res.json({ success: false, err }))
    },
    Update: (req, res) => {
        Recipes.findByIdAndUpdate(req.params.id, req.body)
            .then(result => {
                Logger.create({
                        userId: SchemaTypes.ObjectId(req.user._id),
                        action: 'Updated recipes ' + result._id
                    })
                    .then(result => {

                        res.json({ success: true, message: 'Successfully updated recipe' })
                    }).catch(err => res.json(err));
            })
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
    delete: (req, res) => {
        Recipes.findByIdAndRemove(req.params.id)
            .then(result => {
                Logger.create({
                        userId: SchemaTypes.ObjectId(req.user._id),
                        action: 'Deleted recipes ' + result._id
                    })
                    .then(result => {

                        res.json({ success: true, message: 'Successfully deleted recipe' })
                    }).catch(err => res.json(err));

            })
            .catch(err => res.json({ success: false, message: 'An error occurred. Kindly try again later' }))
    },
}