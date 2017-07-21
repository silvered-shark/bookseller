var express = require('express');
var router = express.Router();

// defining all routes
// TODO: setting patch request for books
var Book = require('../models/book');


router.route('/')
    .get(getAll)
    .post(addOne)

router.route('/{bookname}')
    .get(getByName)
    .delete(deleteByName)
    .put(updateByName)

router.route('/{bookname}/sellers')
     .get(getAllSellers)
     .post(addSellerByBook)

router.route('/{bookname}/sellers/{sellerId}')
     .get(getSeller)
     .put(updateSellerByBook)
     .delete(deleteByBook)


//TODO: add winston logging for every database operation


getAll = function (req, res, next) {

    Book.find({}, function (err, books) {
       if (err)
           throw err;

       res.json(books);
       next();

    });

}


getByName = function (req, res, next) {

    Book.find({ name : bookname}, function (err, book) {
        if(err)
            throw err;
        res.json(book);
        next();
    })

}


addOne = function (req, res, next) {

    var Book = new Book();

    Book.name = req.body.name;
    Book.expectedRate = req.body.expectedRate;
    Book.type = req.body.type;

    Book.save(function(err) {

        if(err)
            throw err;
        res.send("Created user");
        res.json(Book);

    })


}