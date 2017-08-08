var express = require('express');
var router = express.Router();

module.exports = function (router, passport) {


router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res, next) {
  var options = {title:"Bookseller"};
    res.render('index',options);
});


router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile',
        failureRedirect: '/'}));

router.get('/profile',isLoggedIn,function (req, res) {
     res.redirect('/');
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/login',function (req, res, next) {
  //  req.onSignIn();
});


/*
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
*/
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/profile');
    });

};

 function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
    {

        return next();
    }
    // flash messages
    res.redirect('/');

}

