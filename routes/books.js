var express = require('express');
var router = express.Router();

// defining all routes
// TODO: setting patch request for books
var Book = require('../models/book');



var User = require('../models/user');


//TODO: add winston logging for every database operation


const getAll = function (req, res, next) {

    Book.find({}, function (err, books) {
        if (err)
            throw err;

        res.json(books);
        res.end();
        next();

    });

};


const getByName = function (req, res, next) {

    Book.find({ name : req.params.bookname}, function (err, book) {
        if(err)
            throw err;
        res.json(book);
        next();
    })

};


addOne = function (req, res, next) {

    var Book = new Book();

    res.json({"recieve" :req.body.name});
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



const deleteByName = function (req, res, next) {

    Book.remove({ name : req.params.bookname}, function (err, data) {
        if (err)
            throw err;
        res.json(data);
        next();
    })
}


const updateByName = function(req, res ,next) {

    Book.findOne({ name : req.params.bookname }, function (err, Book) {

        if (err)
            throw err;

        Book.name = req.body.name;
        Book.expectedRate = req.body.expectedRate;
        Book.type = req.body.type;

        Book.save(function(err) {

            if(err)
                throw err;
            res.send("Updated Book");
            res.json(Book);
            next();

        })

    })
}

//TODO : Check these special

const getAllSellers = function (req, res, next) {

    var sellingBookInfo = [];
    Book.findOne({ name : req.params.bookname }, function(err, book) {

        if(err)
            throw err;

        var returnObject = {};
        book.sellingInfo.map( function (SellingInfo) {
            returnObject.postedDate = SellingInfo.postedDate;

            SellingInfo.populate('seller').exec( function (err, Info) {

                returnObject.name = Info.seller.name;
                returnObject.email = Info.seller.email;
                returnObject.mobile = Info.seller.mobile;
            })

            sellingBookInfo.unshift(returnObject);
        })
    })

    return sellingBookInfo;

}


const addSellerByBook = function (req, res, next) {

    Book.findOne({ name: req.params.bookname }, function (err, book) {

        if (err)
            throw err;


        var SellingBookInfo = {
            postedDate : Date.now(),
            seller : user._id
        };

        book.unshift(SellingBookInfo);
        book.save(function (err) {
            if (err1)
                throw err1;
        });
    });

    res.json(SellingBookInfo);
    next();

};



const getSeller = function (req, res, next) {

    Book.findOne( {name : req.params.bookname }, function (err, book) {

        if (err)
            throw err;

        var sellerInfo = book.sellingInfo.filter( function (SellingInfo) {
            if (SellingInfo.seller._id == req.params.sellerId)
                return SellingInfo;
        })

        var returnInfo = {};
        returnInfo.postedDate = sellerInfo.postedDate;

        sellerInfo.populate('seller').exec( function (err, Info) {

            returnInfo.name = Info.seller.name;
            returnInfo.email = Info.seller.email;
            returnInfo.mobile = Info.seller.mobile;
        })

        return returnInfo;

    })

}



const deleteByBook = function (req, res, next) {

    Book.findOne( {name : reqparams.bookname}, function(err, book) {
        var SellingInfo = book.sellingInfo.filter( function(Info) {
            if(Info.seller._id != req.params,sellerId)
                return Info
        })

        Book.sellingInfo = SellingInfo;
        Book.save(function (err) {
            if(err)
                throw err;
        })

    })

}

router.route('/')
    .get(getAll)
    .post(function (req, res, next) {



        var addBook = new Book();


        addBook.name = req.body.name;
        addBook.expectedRate = req.body.expectedRate;
        addBook.type = req.body.type;

        addBook.save(function(err) {

            if(err)
                throw err;

        })
        res.send("Created user");

        next();

    })
    
    
router.route('/')
    .get(getAll)
    .post(addOne);

router.route('/{bookname}')
    .get(getByName)
    .delete(deleteByName)
    .put(updateByName);

router.route('/{bookname}/sellers')
     .get(getAllSellers)
     .post(addSellerByBook);

router.route('/{bookname}/sellers/{sellerId}')
     .get(getSeller)
     .put(updateSellerByBook)
     .delete(deleteByBook);



module.exports = router;
