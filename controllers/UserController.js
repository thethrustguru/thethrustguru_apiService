    const User = require('../models/user')
    const jwt = require('jsonwebtoken');
    const config = require('../config/jwt');

    exports.register = (req, res, next) => {

        var count = 0
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {

                res.json({ success: false, message: 'This email address already exists' })
            } else {
                let newUser = new User(req.body)
                console.log(newUser)
                newUser.save()
                    .then(user => {

                        const { firstname, email, lastname, _id } = user
                        res.json({
                            success: true,
                            message: 'You have successfully registered. Please proceed to login',
                            user: { firstname, email, lastname, _id }
                        })
                    })
                    .catch(err => {
                        res.json({
                            success: false,
                            message: 'An error occured. Please try again later',
                            err
                        })
                    })
            }
        })
    }

    exports.login = (req, res, next) => {
        console.log('Login Body ', req.body)
        User.findOne({ email: req.body.email }).then(user => {
            console.log('User ', user)
            if (user) {
                console.log("Hahahahaha")
                    // let userInfo = {}
                user.comparePassword(req.body.password, (err, isMatch) => {
                    console.log("is match", isMatch);
                    if (isMatch) {
                        let token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: 604800
                        });
                        console.log("token", token)
                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                        })
                    } else {
                        res.json(err)
                    }
                })

            } else {
                res.json({ success: false, message: "Login information is incorrect" })
            }

        }).catch(err => {
            res.json({
                success: false,
                message: 'An error occured. Please try again later',
                err
            })
        })
    }




    exports.update = (req, res, next) => {
        const verification = verify.verify(req, res, next)
            //console.log(verification);
        if (verification) {
            User.Update(req.body, { where: { id: req.params.id } }).then(
                user => {
                    res.json(user)
                }
            )
        } else {
            res.sendStatus(403).json({ success: false, message: "You are not authorised to access this resource. Kindly login." })
        }
    }