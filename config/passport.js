const User = require("../models/user");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const JSWT = require("./jwt");
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function(passport) {
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"),
            secretOrKey: JSWT.secret
        },
        function(jwtPayload, cb) {

            // console.log(jwtPayload);
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return User.findById(jwtPayload._id)
                .then(user => {
                    if (user) {

                        return cb(null, user);
                    } else {
                        return cb(null, false);
                    }
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
}