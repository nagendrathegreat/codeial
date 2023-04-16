const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const user = require('../models/users');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}
passport.use(new JWTStrategy(opts,function(jwtPayload,done){

User.findBYId(jwtPayload._id,function(err,user){
    if(err){
        console.log('Error in finding user from JWT'); return;
    }
    if(user){
        return done(null,user);
    }else{
        returndone(null,false);
    }
})


}));
module.exports=passport;