var express = require('express');
var router = express.Router();

router.get('/products',function (req, res, next) {

});

router.get('/books',function (req, res, next) {
     var options = {};
     options.title = 'Book || Sell';
     console.log(options);
    res.render('sellbook',options);
    console.log('after');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
    {

        return next();
    }
    // flash messages
    res.redirect('/');

}

module.exports = router;