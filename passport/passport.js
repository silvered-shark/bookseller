/**
 * Created by sachin on 21/7/17.
 */
const configAuth = require('./auth');
const FacebookStrategy = require('passport-facebook').Strategy;
const userFacebook = require('../models/user.js');

module.exports = function (passport) {

    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                      if(err)
                          return done(err);
                      if(user)
                          return done(null, user);
                      else{
                          var userFacebook = new userFacebook();
                          userFacebook.facebook.id = profile.id;
                          userFacebook.facebook.token = accessToken;
                          userFacebook.facebook.name = profile.name.givenName + " " + profile.name.familyName ;
                          userFacebook.facebook.email = profile.emails[0].value;

                          userFacebook.save(function (err) {
                             if(err)
                                 return done(err);
                             else{
                                 return done(null, userFacebook);
                             }
                          });
                      }
                });

            });

        }
    ));

}
