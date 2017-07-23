/**
 * Created by sachin on 21/7/17.
 */
const configAuth = require('./auth');

const FacebookStrategy = require('passport-facebook').Strategy;

const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const User = require('../models/user.js');

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
                          var newuser = new User();
                          newuser.facebook.id = profile.id;
                          newuser.facebook.token = accessToken;
                          newuser.name = profile.name.givenName + " " + profile.name.familyName ;
                          newuser.email = profile.emails[0].value;

                          newuser.save(function (err) {
                             if(err)
                                 return done(err);
                             else{
                                 return done(null, newuser);
                             }
                          });
                      }
                });

            });

        }
    ));


    passport.use(new GoogleStrategy({
            consumerKey: configAuth.GmailAuth.clientID,
            consumerSecret: configAuth.GmailAuth.clientSecret,
            callbackURL: configAuth.GmailAuth.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            process.nextTick(function () {
                User.findOne({googleId: profile.id}, function (err, user) {
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else{

                    }
                });

            });

        }
    ));

}
