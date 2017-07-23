var express = require('express');
var router = express.Router();

module.exports = function (router,passport) {

router.get('/', function(req, res, next) {
  res.json({"Hello":"Sachin"});
});

router.get('/profile',function (req, res, next) {
  res.json({user:req.user});
});

router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile',
        failureRedirect: '/' }));

router.post('/login',function (req, res, next) {

});


router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/profile');
    });

}
