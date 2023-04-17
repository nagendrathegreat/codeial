const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;//require('passport-google-oauth').OAuth2Startegy;
const crypto = require('crypto');
const User = require('../models/users');


//tell passport to use a new strategy for google  login
passport.use(new googleStrategy({
    clientID: "Client Id",
    clientSecret: "Client secret Id",
    callbackURL: "http://127.0.0.1:8000/users/auth/google/callback",
    passReqToCallback   : true,
},
    function (request,accessToken, refreshToken, profile, done) {

        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('error in google strategy-passport', err); return;
            }
            console.log(profile);
            if (user) {
                //if found,set the user as req.user
                return done(null, user);
            } else {
                // if user not found ,create the user and set the req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('error in creating user google strategy-passport', err); return;
                    } else {
                        return done(null, user);
                    }
                });

            }
        });
    }


));


module.exports = passport;