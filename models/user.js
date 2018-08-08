'use strict';
var bcrypt = require("bcrypt");
const bcrypt_p = require('bcrypt-promise');
let mongoose = require("mongoose");
let Schema = mongoose.Schema();


let UserSchema = new mongoose.Schema({
    email: { type: String, index: { unique: true } },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },


})

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (user.isModified('password') || user.isNew) {
        // generate a salt
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash;
                next();
            })
        });
    } else {
        return next();
    }

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        console.dir("bcrypt", isMatch)
        cb(null, isMatch);
    })
};

/* 
UserSchema.methods.getJWT = function() {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer " + jwt.sign({ id: this.id, role: this.roleId }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
};

UserSchema.methods.toWeb = function(pw) {
    let json = this.toJSON();
    return json;
}; */

UserSchema.methods.equals = function(user) {
    return user && this.id === user.id;
}

module.exports = mongoose.model("User", UserSchema)