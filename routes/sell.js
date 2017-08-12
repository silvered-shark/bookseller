var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/products',function (req, res, next) {

});

router.get('/books',function (req, res, next) {
    //var options = {};
    //options.title = 'Book || Sell';
    Book.find({}, function(err, books) {
        var options = {};
        options.title = 'Sell Book  '
        options.books = books;
        res.render('bookSellForm', options);
    });


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